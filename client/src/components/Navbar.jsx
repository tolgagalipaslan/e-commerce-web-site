import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="min-h-fit h-[127px] w-full bg-[#5b11a9]  text-mainNavbar flex flex-col">
      <div className="w-full h-[81px] bg-[#2d0c51] flex items-center fixed z-50">
        <div className="w-[1180px]  mx-auto flex  justify-between ">
          {/* md flex */}
          <div className="relative w-7/12 md:flex hidden items-center justify-between">
            <Link
              to="/"
              className=" flex items-center bg-[#5b11a9]  h-[48px] py-2 px-4 rounded-l-full  gap-2"
            >
              <img
                src="assets/logo.png"
                alt=""
                className=" rounded  w-full h-full"
              />
              <h1 className="border-l px-2 text-xl font-semibold text-white opacity-80">
                Plago
              </h1>
            </Link>
            <form className="bg-gray-100  items-center overflow-hidden flex rounded-r-full w-full  text-black">
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
          {/* md hidden */}
          <div className="md:hidden flex items-center justify-around w-3/6">
            <Link
              to="/"
              className=" flex items-center bg-[#5b11a9] ml-4 h-[58px]  w-[58px] rounded-full  gap-2"
            >
              <img
                src="assets/logo.png"
                alt=""
                className=" rounded-full  w-full h-full"
              />
            </Link>
            <form className="bg-gray-100  items-center overflow-hidden px-2 flex rounded-full  h-[40px] text-black">
              <input
                type="text"
                className="bg-transparent outline-none py-2  w-[120px] h-[18px] font-semibold"
                placeholder="Search "
              />
              <div className="  py-2 ">
                <button className="  bg-transparent  outline-none   border-l-2  border-black  text-2xl">
                  <AiOutlineSearch />
                </button>
              </div>
            </form>
          </div>
          <div className=" text-white flex gap-2 items-center">
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
