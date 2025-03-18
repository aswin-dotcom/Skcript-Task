"use client";

import Styles from "./Styles.module.css";
import { Task } from "./Task.js";
import {useTask} from '../Store/Taskstore'
import Board from "./Board/page.js";

export default function Filter() {
  const { popupOpen, togglePopup , selectedItem, setSelectedItem} = useTask();

  
  const handleClick = (item) => {
    setSelectedItem(item);
    console.log("Selected Item:", selectedItem); // Debugging
  };


  return (
    <>
      <div className={Styles.center}>
        <div className="">
          <h2 className="text-[18px] font-semibold leading-[27px] text-[#171717]">
            Roadmaps
          </h2>
          <p className="text-[13px] leading-[19.5px] text-[#171717]">
            Stay connected with our development journey and get a sneak peek at
            upcoming features! 😉
          </p>
        </div>
        <div className={Styles.filter}>
          <div className="relative cursor-pointer inline-flex h-[27px] whitespace-nowrap">
            <button
              onClick={togglePopup}
              className={Styles.dropdown}
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
              <div className={Styles.ul}>
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
                    <li key={item} className={Styles.li}>
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
      <div className="md:mx-[16%] mt-[2%]">
        <Task selectedItem={selectedItem} />
        {/* <Board /> */}
      </div>
    </>
  );
}
