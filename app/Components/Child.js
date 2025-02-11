"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RiArrowUpSLine } from "react-icons/ri";
import Styles from "./Styles.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { LuBellRing } from "react-icons/lu";
import { LuToggleLeft } from "react-icons/lu";
import { PiWarningCircle } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import { FiActivity } from "react-icons/fi";
import { LiaCommentsSolid } from "react-icons/lia";

let initialColumns = [
    // {
    //   id: "Planned",
    //   title: "Planned",
    //   cards: [
    //     {
    //       id: "task1",
    //       content:
    //         "Improve Jira Integration supporting posting feedback to multiple Jira projects",
    //       label: "Design",
    //       Date: "2023-06-30",
    //       upvotes: 9,
    //       status: "Planned",
    //       Board: "Integration",
    //       PostedBy: "Aswin",
    //     },
    //     {
    //       id: "task2",
    //       content: "Crisp integration Improvements",
    //       label: "Development",
    //       Date: "2023-07-05",
    //       upvotes: 3,
    //       status: "Planned",
    //       Board: "Bugs & Fixes",
    //       PostedBy: "Aswin Samuvel",
    //     },
    //   ],
    // },
    // {
    //   id: "inProgress",
    //   title: "In Progress",
    //   cards: [
    //     {
    //       id: "task3",
    //       content: "Write API documentation",
    //       label: "Documentation",
    //       Date: "2023-07-10",
    //       upvotes: 5,
    //       status: "Planned",
    //       Board: "Feature request",
    //       PostedBy: "Jack Samuvel",
    //     },
    //   ],
    // },
    // {
    //   id: "done",
    //   title: "Completed",
    //   cards: [
    //     {
    //       id: "task4",
    //       content: "Set up project repository",
    //       label: "Setup",
    //       Date: "2023-06-25",
    //       upvotes: 8,
    //       status: "Planned",
    //       Board: "Integration",
    //       PostedBy: "Jack Samuvel",
    //     },
    //   ],
    // },custom
  ];
export  function Child({selectedItem}){
    const [columns, setColumns] = useState(initialColumns);
    const [upvotedCards, setUpvotedCards] = useState(new Set());
    const [filter, setfilter] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [popupDetails, setPopupDetails] = useState(null);
    const [tabs, setTabs] = useState(true);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [subscribe, setSubscribe] = useState("Unsubscribe");
    // const [Subscribe,Unsubscribe]=useState('Unsubscribe');
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    
    useEffect(() => {
      
        fetch("/api/task")
          .then((res) => res.json())
          .then((data) => {
            setColumns(data);
            initialColumns=data;
            
            console.log(initialColumns,"Initial column");
          })
          .catch((error) => console.error("Error fetching data:", error));
   
      
    }, []);
  
    useEffect(() => {
      const filteredColumns = initialColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.Board.includes(selectedItem)),
      }));
      setColumns(filteredColumns);
    }, [selectedItem]);



  
  
    const handleUpvoters = (cardId) => {
      setColumns((prevColumns) =>
        prevColumns.map((col) => ({
          ...col,
          cards: col.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  upvotes: upvotedCards.has(cardId)
                    ? card.upvotes - 1
                    : card.upvotes + 1,
                }
              : card
          ),
        }))
      );
  
      setUpvotedCards((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(cardId)) {
          newSet.delete(cardId); // Remove upvote
        } else {
          newSet.add(cardId); // Add upvote
        }
        return newSet;
      });
    };
  
    const popupvotes = (cardId) => {
      setPopupDetails((prev) => ({
        ...prev,
        upvotes: upvotedCards.has(cardId) ? prev.upvotes - 1 : prev.upvotes + 1,
      }));
    };
  
    const onDragEnd = (result) => {
      if (!result.destination) return;
      const { source, destination } = result;
  
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns.find((col) => col.id === source.droppableId);
        const destColumn = columns.find(
          (col) => col.id === destination.droppableId
        );
        const sourceCards = [...sourceColumn.cards];
        const destCards = [...destColumn.cards];
        const [removed] = sourceCards.splice(source.index, 1);
  
        destCards.splice(destination.index, 0, removed);
        removed.status = destColumn.title;
        removed.activies.push(`Task Status Changed to ${removed.status } at ${timestamp}`)
        console.log(removed);
  
        setColumns(
          columns.map((col) => {
            if (col.id === source.droppableId) {
              return { ...col, cards: sourceCards };
            }
            if (col.id === destination.droppableId) {
              return { ...col, cards: destCards };
            }
            return col;
          })
        );
        console.log(columns);
      } else {
        const column = columns.find((col) => col.id === source.droppableId);
        const copiedCards = [...column.cards];
        const [removed] = copiedCards.splice(source.index, 1);
        copiedCards.splice(destination.index, 0, removed);
        setColumns(
          columns.map((col) => {
            if (col.id === source.droppableId) {
              return { ...col, cards: copiedCards };
            }
            return col;
          })
        );
      }
    };
    const handleSubscription = () => {
      setSubscribe(subscribe === "Unsubscribe" ? "Get notified" : "Unsubscribe");
    };
    const opendetails = (id) => {
      console.log(id);
      const popupdetails = findCardById(columns, id);
  
      // Set the popup details (Assuming setPopupDetails exists)
      if (popupdetails) {
        setIsOpen(true);
        setPopupDetails(popupdetails);
        console.log(popupdetails, "popupdetails");
      } else {
        console.log("Card not found!");
      }
      setIsOpen(true);
    };
    const findCardById = (columns, cardId) => {
      for (const column of columns) {
        const card = column.cards.find((c) => c.id === cardId);
        if (card) return card;
      }
      return null; // Return null if no card is found
    };
    // const onChangeHandler=(e)=>{
    //   setComment(e.target.value);
  
    // }
    const onClickHandler = (id) => {
      if(comment.length>0){
        const popupdetails = findCardById(columns, id);
        if (popupdetails) {
          popupdetails.comments.push(comment);
        }
        // setComments((prevcomments) => [...prevcomments, comment]);
    
        setComment("");

      }
   
    };
    return (
        <div className="bg-white">
          <div className="p-2 bg-white min-h-screen ">
          
    
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex overflow-x-auto md:flex-row gap-4 ">
                {columns.map((column) => (
                  <div key={column.id} className="flex-1 min-w-[250px]">
                    <h2
                      className={`text-[13px] flex gap-1 font-semibold leading-[19.5px] rounded-tl-lg rounded-tr-lg p-2 bg-[#F8F8F8] border border-gray-300 
          ${column.title === "Planned" ? "text-pink-500" : ""}
          ${column.title === "In Progress" ? "text-[#FFAB04]" : ""}
          ${column.title === "Completed" ? "text-green-500" : ""}
        `}
                    >
                      {column.title == "Planned" ? (
                        <span className={Styles.noscrollbar}>
                          <img src="/crosshair-bold.svg " height={14} width={14} />
                        </span>
                      ) : column.title == "In Progress" ? (
                        <span className={Styles.yellow}>
                          <img src="/cooking-pot-bold.svg" height={14} width={14} />
                        </span>
                      ) : (
                        <span className={Styles.green}>
                          <img
                            src="/flag-checkered-bold.svg"
                            height={14}
                            width={14}
                          />
                        </span>
                      )}
                      {column.title}
                    </h2>
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={`bg-[#F8F8F8]  overflow-y-auto Styles.no-scrollbar border border-gray-300 p-2 rounded-bl-lg rounded-br-lg   transition-colors ${
                            snapshot.isDraggingOver ? "bg-blue-100" : ""
                          }`}
                          style={{ scrollbarWidth: "none" ,height:"58vh"}}
                        >
                          {column.cards.map((card, index) => (
                            //  isUpvoted = upvotedCards.has(card.id)
                            <Draggable
                              key={card.id}
                              draggableId={card.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white p-4 mb-4 rounded shadow-md transition-transform ${
                                    snapshot.isDragging ? "scale-105" : ""
                                  } hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300`}
                                >
                                  {/* <h3 className="font-medium mb-2">{card.content}</h3> */}
    
                                  <div className="flex  gap-5 text-sm text-gray-600 ">
                                    <div
                                      onClick={() => handleUpvoters(card.id)}
                                      className="flex flex-col items-center text-[12px] leading-[12px] text-center text-[#171717] border border-[#DBDBDB] p-[6px] px-[8px] max-h-[40px]  
        rounded-[8px]   data-[upvoted=true]:bg-[#F6F6FF] data-[upvoted=true]:border-[#5551FF]"
                                      data-upvoted={upvotedCards.has(card.id)}
                                    >
                                      <RiArrowUpSLine />
                                      <span>{card.upvotes}</span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                      <div>
                                        <p
                                          className="text-[12px] font-medium leading-[19.5px] text-[#171717] "
                                          onClick={() => opendetails(card.id)}
                                        >
                                          {card.content.length > 75 ? card.content.slice(0, 75) + "..." : card.content}
                                        </p>
                                      </div>
                                      <div
                                        className=" 
      "
                                      >
                                        <button className="text-[10px] hover:bg-[#F8F8F8]  rounded-[5px] px-2 mt-2 border border-[#E5E5E5] flex justify-center    font-medium leading-[15px] text-[#6F6F6F] ">
                                          {card.Board}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
          {/* ?<div className="block space-y-4 md:flex md:space-y-0 md:space-x-4 rtl:space-x-reverse"> */}
    
          {/* <button
              onClick={() => setIsOpen(true)}
              className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Extra Large Modal
            </button> */}
          {isOpen && (
            <div className="fixed top-0 left-0 right-0 z-50 w-[100%]  overflow-x-hidden overflow-y-auto h-[90%] max-h-full flex items-center justify-center ">
              <div className="relative w-[90%] max-w-7xl max-h-ful h-[90%]">
                <div className="relative bg-white rounded-lg shadow-sm h-[100%] overflow-y-auto scrollbar-hide border border-[#D1D5DB] ">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between  p-1 md:p-2 border-b border-b-[#D1D5DB] rounded-t ">
                    <h3 className="text-[#171717] font-medium p-2 border border-[#D1D5DB] rounded-lg  hover:bg-[#F8F8F8]">
                      <FiArrowLeft onClick={() => setIsOpen(false)} />
                    </h3>
                  </div>
    
                  {/* Modal Body */}
                  <div className="p-3 md:p-3 space-y-1 md:flex">
                    <div className="1_st half   md:w-[70%] ">
                      <div className=" ml-[4.5%] text-[#171717] text-lg font-semibold text-justify">
                        {popupDetails.content}
                      </div>
                      <div className="flex justify-start gap-5 w-[90%] py-2">
                        <div
                          onClick={() => {
                            handleUpvoters(popupDetails.id);
                            popupvotes(popupDetails.id);
                          }}
                          className="flex flex-col items-center text-[12px] leading-[12px] text-center text-[#171717] border border-[#DBDBDB] p-[6px] px-[8px] max-h-[40px]  
        rounded-[8px]   data-[upvoted=true]:bg-[#F6F6FF] data-[upvoted=true]:border-[#5551FF]"
                          data-upvoted={upvotedCards.has(popupDetails.id)}
                        >
                          <RiArrowUpSLine />
                          <span>{popupDetails.upvotes}</span>
                        </div>
                        <div>
                          <p className="text-[#323232] text-[13px]">
                            {popupDetails.description}
                          </p>
                        </div>
                      </div>
                      <div className="w-[90%]">
                        <div className="border-b border-gray-200 dark:border-neutral-700">
                          <nav
                            className="flex gap-x-1"
                            aria-label="Tabs"
                            role="tablist"
                            aria-orientation="horizontal"
                          >
                            <button
                              onClick={() => setTabs(true)}
                              type="button"
                              className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-1 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 active"
                            >
                              <GoComment /> Comments
                            </button>
                            <button
                              onClick={() => setTabs(false)}
                              type="button"
                              className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-1 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                            >
                              <FiActivity /> Activities
                            </button>
                            {/* <button
                              type="button"
                              className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500"
                              id="tabs-with-underline-item-3"
                              aria-selected="false"
                              data-hs-tab="#tabs-with-underline-3"
                              aria-controls="tabs-with-underline-3"
                              role="tab"
                            >
                              Tab 3
                            </button> */}
                          </nav>
                        </div>
                        <div className="mt-3">
                          {tabs ? (
                            <div className="">
                              <div className="">
                                <textarea
                                  className="block p-2.5 w-full text-[13px] text-[#171717]  bg-gray-50 rounded-lg border focus:outline-none"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                              </div>
                              <div className="flex justify-end ">
                                <button
                                  className=" text-white  bg-[#5551FF]  focus:outline-none font-medium rounded-lg text-[10px]  text-center  mb-2 px-2 py-2 mt-1"
                                  onClick={() => {
                                    onClickHandler(popupDetails.id);
                                  }}
                                >
                                  Comment Publicly
                                </button>
                              </div>
    
                              <div className="bg-white text-[13px] text-[#171717] ">
                                {popupDetails.comments.length > 0 ? (
                                  popupDetails.comments.map((text, index) => (
                                    <div
                                      className="m-3 border border-[#E5E7EB] p-4 rounded-lg"
                                      key={index}
                                    >
                                      {text}
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-[#171717] ms-[50%]">
                                    <LiaCommentsSolid size={50} />
                                    <p>No Comments</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div id="tabs-with-underline-2">
                                {popupDetails.activies.length > 0 ? (
                                  popupDetails.activies.map((text, index) => (
                                    <p
                                      className="m-3 border text-[#323232] text-[13px] border-[#E5E7EB] p-4 rounded-lg"
                                      key={index}
                                    >
                                      {text}
                                    </p>
                                  ))
                                ) : (
                                  <div className="text-[#171717] ms-[50%]">
                                    <LiaCommentsSolid size={50} />
                                    <p>No Activies</p>
                                  </div>
                                )}
                            </div>
                          )}
                        </div>
                        
                      </div>
                    </div>
                    <div className="2_nd half md:w-[30%]">
                      <div className="bg-[#F8F8F8]   rounded-[5px]">
                        <p className="flex justify-start gap-2  border-b border-gray-300  p-2 text-[#171717] text-[13px]">
                          <span className="mt-[2px]">
                            <PiWarningCircle />
                          </span>
                          Post Information
                        </p>
                        <div className="">
                          <p className="text-[15px] text-[#171717]  pl-2 pt-2  font-semibold">
                            Subscribe to post
                          </p>
                          <p className="pl-2 pb-2 text-[#999999] text-[10px]">
                            Get notified to email when there are changes
                          </p>
                          <button
                            className="flex ml-2 text-[10px] rounded-[7px] items-center gap-2 pl-2 pr-2 pt-1 pb-1 bg-[#5551FF] text-white"
                            onClick={handleSubscription}
                          >
                            <LuBellRing />
                            {subscribe}
                          </button>
                          <div
                            className="flex justify-between mt-2 mb-2  text-[#171717] p-2 text-[13px]
                          "
                          >
                            Upvoters
                            <div
                              onClick={() => {
                                handleUpvoters(popupDetails.id);
                                popupvotes(popupDetails.id);
                              }}
                              // onClick={() => handleUpvoters(card.id)}
                              className="flex   text-[12px] leading-[12px] text-center text-[#171717] border border-[#DBDBDB] p-[6px] px-[8px] max-h-[40px]  mx-w-[40px ]
        rounded-[8px]   data-[upvoted=true]:bg-[#F6F6FF] data-[upvoted=true]:border-[#5551FF] me-6"
                              data-upvoted={upvotedCards.has(popupDetails.id)}
                            >
                              <RiArrowUpSLine />
                              <span>{popupDetails.upvotes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#F8F8F8]   rounded-[5px]">
                        <p className="flex justify-start gap-2  border-b border-gray-300  p-2 text-[#171717] text-[13px]">
                          <span className="mt-[2px]">
                            {" "}
                            <LuToggleLeft />{" "}
                          </span>
                          Post Details
                        </p>
                        <div>
                          <div className="flex justify-start p-2 text-[13px] text-[#171717] ">
                            <p className="w-[50%]">Status</p>
                            <p className="flex items-center gap-2">
                              {" "}
                              {popupDetails.status == "Planned" ? (
                                <span className={Styles.noscrollbar}>
                                  <img
                                    src="/crosshair-bold.svg "
                                    height={14}
                                    width={14}
                                  />
                                </span>
                              ) : popupDetails.status == "In Progress" ? (
                                <span className={Styles.yellow}>
                                  <img
                                    src="/cooking-pot-bold.svg"
                                    height={14}
                                    width={14}
                                  />
                                </span>
                              ) : (
                                <span className={Styles.green}>
                                  <img
                                    src="/flag-checkered-bold.svg"
                                    height={14}
                                    width={14}
                                  />
                                </span>
                              )}
                              {popupDetails.status}
                            </p>
                          </div>
                          <div className="flex justify-start p-2 text-[13px] text-[#171717]">
                            <p className="w-[50%]">Assigned to</p>
                            <p className="">{popupDetails.Assignedto}</p>
                          </div>
                          <div className="flex justify-start p-2 text-[13px] text-[#171717]">
                            <p className="w-[50%]">Board</p>
                            <p>{popupDetails.Board}</p>
                          </div>
                          <div className="flex justify-start p-2 text-[13px] text-[#171717]">
                            <p className="w-[50%]">Posted on</p>
                            <p>{popupDetails.Date}</p>
                          </div>
                          <div className="flex justify-start p-2 text-[13px] text-[#171717]">
                            <p className="w-[50%]">Posted by</p>
                            <p>{popupDetails.PostedBy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    {/* accordian */}
                  </div>
    
                  {/* Modal Footer */}
                </div>
              </div>
            </div>
          )}
        </div>
      );
}