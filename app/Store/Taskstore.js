import { create } from "zustand";
const timestamp = new Date().toLocaleString("en-US", {
  year: "numeric", // Displays the full year (e.g., 2025)
  month: "short", // Displays a short month name (e.g., Feb)
  day: "numeric", //Displays the day of the month (e.g., 11)
  hour: "numeric", //Displays the hour (e.g., 3 PM)
  minute: "numeric", //Displays the minutes (e.g., 45)
  hour12: true, // Enables 12-hour format with AM/PM
});
let initialColumns = [];
export const useTask = create((set) => ({
  columns: [],
  upvotedCards: new Set(),
  filter: "",
  isOpen: false,
  popupDetails: null,
  tabs: true,
  comment: "",
  comments: [],
  subscribe: "Unsubscribe",
  popupOpen: false,
  selectedItem: "",

  fetchTasks: async () => {
    try {
      const res = await fetch("/api/task");
      const data = await res.json();
      set({ columns: data });
      initialColumns = data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  setFilter: (newFilter) => set({ filter: newFilter }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setTabs: (bool) => set({ tabs: bool }),
  setComment: (value) => set({ comment: value }),

  filterColumns: () =>
    set((state) => {
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.Board.includes(state.filter)),
      }));

      console.log(updatedColumns); // Corrected placement

      return { columns: updatedColumns };
    }),

  togglePopup: () => set((state) => ({ popupOpen: !state.popupOpen })),
  setSelectedItem: (item) =>
    set(() => ({ selectedItem: item === "Show all" ? "" : item })),

  handleUpvoters: (cardId) =>
    set((state) => {
      const newUpvotedCards = new Set(state.upvotedCards);

      if (newUpvotedCards.has(cardId)) {
        newUpvotedCards.delete(cardId);
      } else {
        newUpvotedCards.add(cardId);
      }

      const updatedColumns = state.columns.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                upvotes: newUpvotedCards.has(cardId)
                  ? card.upvotes + 1
                  : card.upvotes - 1,
              }
            : card
        ),
      }));

      return { columns: updatedColumns, upvotedCards: newUpvotedCards };
    }),

  popupvotes: (cardId) =>
    set((state) => {
      const newUpvotedCards = new Set(state.upvotedCards);

      if (newUpvotedCards.has(cardId)) {
        newUpvotedCards.delete(cardId);
      } else {
        newUpvotedCards.add(cardId);
      }
      if (!state.popupDetails) return {};

      return {
        popupDetails: {
          ...state.popupDetails,
          upvotes: newUpvotedCards.has(cardId)
            ? state.popupDetails.upvotes - 1
            : state.popupDetails.upvotes + 1,
        },
      };
    }),

  handleSubscription: () =>
    set((state) => ({
      subscribe:
        state.subscribe === "Unsubscribe" ? "Get notified" : "Unsubscribe",
    })),

  opendetails: (id) =>
    set((state) => {
      const popupDetails = state.columns
        .flatMap((col) => col.cards)
        .find((card) => card.id === id);

      if (popupDetails) {
        return {
          ...state, // Preserve other state properties
          isOpen: true,
          popupDetails: popupDetails, // Explicitly update popupDetails
        };
      } else {
        console.log("Card not found!");
        return state; // Return the current state if no change is needed
      }
    }),

  addCommentToCard: (id, comment) =>
    set((state) => {
      const updatedColumns = state.columns.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === id
            ? {
                ...card,
                comments: [...card.comments, comment],
              }
            : card
        ),
      }));

      // Find updated card details
      const updatedPopupDetails = updatedColumns
        .flatMap((col) => col.cards)
        .find((card) => card.id === id);

      return {
        columns: updatedColumns,
        popupDetails: updatedPopupDetails,
        comment: "",
      };
    }),

  onDragEnd: (result) =>
    set((state) => {
      if (!result.destination) return state; // No movement, return original state

      const { source, destination } = result;

      // Clone the columns array to ensure immutability
      const updatedColumns = state.columns.map((col) => ({
        ...col,
        cards: [...col.cards], // Clone the cards array
      }));

      const sourceCol = updatedColumns.find(
        (col) => col.id === source.droppableId
      );
      const destinationCol = updatedColumns.find(
        (col) => col.id === destination.droppableId
      );

      if (!sourceCol || !destinationCol) return state;

      // Remove the dragged card from the source column
      const [movedCard] = sourceCol.cards.splice(source.index, 1);

      // Ensure movedCard exists
      if (!movedCard) return state;

      // Prevent duplication: Check if destination already contains the same card
      if (destinationCol.cards.some((card) => card.id === movedCard.id)) {
        console.warn(`Duplicate card detected: ${movedCard.id}`);
        return state;
      }

      // Update the card's status before inserting
      movedCard.status = destinationCol.title;

      // Insert the card into the destination column
      destinationCol.cards.splice(destination.index, 0, movedCard);
      movedCard.activies.push(
        `Task Status Changed to ${movedCard.status} at ${timestamp}`
      );

      return { columns: updatedColumns };
    }),
}));

export default useTask;
