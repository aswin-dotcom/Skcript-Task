import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FaRegUserCircle } from "react-icons/fa";
import Styles from "./Styles.module.css";
import { GoTelescope } from "react-icons/go";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { PiBookBookmark } from "react-icons/pi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <div className={Styles.bottom}>
        <div className={Styles.header}>
          <div className="flex justify-start cursor-pointer">
            <img
              src="alphaos_logo.jpg"
              alt="logo"
              width={30}
              height={30}
              className="rounded-[50%]"
            />
            <h4 className="pt-1 pl-1 text-[21px] font-semibold leading-[22.5px] ">FeatureOs</h4>
          </div>
          <FaRegUserCircle className="pt-1 cursor-pointer" size={30} />
        </div>
        <div className={Styles.subheader}>
          <div className="cursor-pointer group  hover:text-blue-500"> 
            <p className="p-2 cursor-pointer text-[13px] flex">
              <img src="svgviewer-png-output.png" className={Styles.board}   alt="board" />
              BOARDS 
            </p>
          </div>
          <div className="cursor-pointer group   text-blue-500">
            <p className="p-2 flex text-[13px]">
              <GoTelescope size={15} className="pr-1 text-blue-500 " />
              ROADMAP
            </p>
          </div>
          <div className=" cursor-pointer  hover:text-blue-500">
            <p className="p-2 flex text-[13px]">
              <MdOutlineRocketLaunch
                size={15}
                className="pr-1 group-hover:text-blue-500"
              />
              CHANGELOG
            </p>
          </div>
          <div className="cursor-pointer group  hover:text-blue-500">
            <p className="p-2 flex text-[13px]">
              <PiBookBookmark
                size={15}
                className="pr-1 group-hover:text-blue-500"
              />
              KNOWLEDGE BASE
            </p>
          </div>
        </div>


        </div>
   
        {children}
       
      </body>
    </html>
  );
}
