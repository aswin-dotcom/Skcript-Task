"use client";

import Styles from "./Styles.module.css";
import { useState } from "react";
import { Child } from "./Child.js";

export default function Parent() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleClick = (item) => {
    // setSelectedItem('');
    if(item=="Show all"){
      setSelectedItem('');

    }else{
      setSelectedItem(item);  

    }
    // Assign the clicked value
    console.log("Selected Item:", selectedItem); // Debugging
  };

  const toggleFirstDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setStatusOpen(false); // Close the second dropdown
  };

  const toggleSecondDropdown = () => {
    setStatusOpen(!statusOpen);
    if (!statusOpen) setIsOpen(false); // Close the first dropdown
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
        {/* <div className="relative inline-flex h-[27px]">
          <button
            onClick={toggleSecondDropdown}
            className={Styles.dropdown}
            type="button"
            aria-haspopup="menu"
            aria-expanded={statusOpen}
          >
            Group by Status
            <svg
              className={`w-2.5 h-2.5 ms-3 transition-transform ${
                statusOpen ? "rotate-180" : ""
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

          {statusOpen && (
            <div className={Styles.ul}>
              <ul
                className="text-sm border border-[#F2E2E2] w-[176px] rounded-[5%] text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {[
                  "Group by Monthly",
                  "Group by Quarterly",
                  "Group by Status",
                ].map((item) => (
                  <li key={item} className={Styles.li}>
                    <a
                      href="#"
                      className="block px-4 py-1 m-1 rounded-[5px] hover:bg-gray-100  "
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div> */}
        <div className="relative inline-flex h-[27px]">
          <button
            onClick={toggleFirstDropdown}
            className={Styles.dropdown}
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
          >
            Show All
            <svg
              className={`w-2.5 h-2.5 ms-3 transition-transform ${
                isOpen ? "rotate-180" : ""
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

          {isOpen && (
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
                     
                      className="block px-4 py-1 m-1 rounded-[5px] hover:bg-gray-100  " onClick={() => handleClick(item)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                {/* <p>Selected: {selectedItem}</p> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      
    </div>
    <div  className="md:mx-[16%] mt-[2%]">
    <Child selectedItem={selectedItem}/>

    </div>
    
    </>

    
  );
}
