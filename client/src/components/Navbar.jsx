import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { RxDotFilled } from "react-icons/rx";
const Navbar = () => {
  return (
    <div className="min-h-fit h-[127px] w-full bg-[#5b11a9]  text-mainNavbar flex flex-col">
      <div className="w-full h-[81px] bg-[#2d0c51] flex items-center ">
        <div className="w-[1180px]  mx-auto flex  justify-between">
          <div className="relative w-7/12 flex  items-center justify-between">
            <div className=" flex items-center bg-[#5b11a9]  h-[48px] py-2 px-4 rounded-l-full  gap-2">
              <img
                src="assets/logo.png"
                alt=""
                className=" rounded  w-full h-full"
              />
              <h1 className="border-l px-2 text-xl font-semibold text-white opacity-80">
                Plago
              </h1>
            </div>
            <form className="bg-[#fdea3e]   items-center overflow-hidden flex rounded-r-full w-full  text-black">
              <img src="" alt="" />
              <input
                type="text"
                className="bg-transparent outline-none py-2 px-4  w-full h-[48px] font-semibold"
                placeholder="Search "
              />
              <div className="  py-2 ">
                <button className="  bg-transparent  outline-none   border-l-2  border-black px-4 text-2xl">
                  <AiOutlineSearch />
                </button>
              </div>
            </form>
          </div>
          <div className="w-3/12 text-white flex gap-2 items-center">
            <BsCart4 className="border-r p-1 text-4xl cursor-pointer" />
            <div className="flex  gap-2 items-center">
              <CiUser className="text-4xl font-semibold p-1 cursor-pointer" />
              <div className="flex flex-col ">
                <h1 className="text-sm opacity-80">My Account</h1>
                <div className="flex gap-2 items-center">
                  <h1 className="underline cursor-pointer">Sign In</h1>
                  <RxDotFilled />
                  <h1 className="underline cursor-pointer">Log In</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[46px]  ">
        <div className="w-[1180px]  h-[46px]  mx-auto  "></div>
      </div>
    </div>
  );
};

export default Navbar;
