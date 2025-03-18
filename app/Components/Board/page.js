"use client";
import React, { useEffect } from "react";
import useTask from "../../Store/Taskstore";
import { RiArrowUpSLine } from "react-icons/ri";
const Board = () => {
  const columns = useTask((state) => state.columns);
  const upvotedCards = useTask((state) => state.upvotedCards);
  const handleUpvoters = useTask((state) => state.handleUpvoters);
  const togglePopup = useTask((state) => state.togglePopup);
  const popupOpen = useTask((state) => state.popupOpen);
  const selectedItem = useTask((state) => state.selectedItem);
  const setSelectedItem = useTask((state) => state.setSelectedItem);
  const filterColumns = useTask((state) => state.filterColumns);
  const setFilter = useTask((state) => state.setFilter);

  

  const handleClick = (item) => {
    setSelectedItem(item);
    console.log("Selected Item:", selectedItem); // Debugging
  };

  useEffect(() => {
    setFilter(selectedItem);
    filterColumns();
  }, [selectedItem]);

  return (
    <div className="flex-col justify-center items-center">
      <div className="flex">
        <div
          className=" flex-col items-end   
"
        >
          <h1>All Posts</h1>
          <p>Have something to say? Join the conversation.</p>
        </div>
        <div>
          <div className="relative cursor-pointer inline-flex h-[27px] whitespace-nowrap">
            <button
              onClick={togglePopup}
              // className={Styles.dropdown}
              type="button"
              aria-haspopup="menu"
              aria-expanded={popupOpen}
            >
              Show All
              <svg
                className={`w-2.5 h-2.5 ms-3 transition-transform ${
                  popupOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {popupOpen && (
              <div>
                <ul
                  className="text-sm border border-[#F2E2E2] w-[176px] rounded-[5%] text-gray-700 bg-white"
                  aria-labelledby="dropdownDefaultButton"
                >
                  {[
                    "Show all",
                    "Bugs & Fixes",
                    "Feature request",
                    "Integration",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        className="block cursor-pointer px-4 py-1 m-1 rounded-[5px] hover:bg-gray-100  "
                        onClick={() => handleClick(item)}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="">
        {columns.map((data) =>
          data.cards.map((task) => (
            <div
              className="m-5 ms-[100px]  mb-[20px] w-[75%] flex  gap-5 text-sm text-gray-600 "
              key={task.id}
            >
              <div
                onClick={() => handleUpvoters(task.id)}
                className="cursor-pointer flex flex-col items-center text-[12px] leading-[12px] text-center text-[#171717] border border-[#DBDBDB] p-[6px] px-[8px] max-h-[40px]  
                    rounded-[8px]   data-[upvoted=true]:bg-[#F6F6FF] data-[upvoted=true]:border-[#5551FF]"
                data-upvoted={upvotedCards.has(task.id)}
              >
                <RiArrowUpSLine />
                <span>{task.upvotes}</span>
              </div>
              {/* <p>{task.description}</p>
              <p>{task.content}</p> */}
              <div
                className="flex flex-col justify-center cursor-pointer"
                // onClick={() => opendetails(card.id)}
              >
                <div>
                  <p className="text-[12px] font-medium leading-[19.5px] text-[#171717] ">
                    {task.content}
                  </p>
                  <div>{task.description}</div>
                </div>
                {/* <div
                  className=" 
      "
                >
                  <div
                  //  className="text-[10px] hover:bg-[#F8F8F8]  px-2 mt-2 border border-[#E5E5E5] flex justify-center    font-medium leading-[15px] text-[#6F6F6F] "
                  >
                    {task.descriptions}
                  </div>
                </div> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
