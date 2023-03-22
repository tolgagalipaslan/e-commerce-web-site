import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCart4, BsFillTriangleFill, BsPerson } from "react-icons/bs";
import { BiLogIn, BiPurchaseTag } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RxDotFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth, { logout } from "../store/auth";
const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const basket = useSelector((state) => state.basket.basket);
  const unValidPaths = ["/register", "/login"];

  useEffect(() => {
    const userUnValidPaths = ["/register", "/login"];

    if (user.userName) {
      if (userUnValidPaths.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [location.pathname, navigate, user, basket]);
  return (
    <div
      className={`${
        unValidPaths.includes(location.pathname) ? "hidden" : "flex"
      } min-h-fit h-[127px] w-full bg-[#5b11a9]  text-mainNavbar  flex-col`}
    >
      <div className="w-full h-[81px] bg-[#2d0c51] flex items-center fixed z-50">
        <div className="w-[1180px]  mx-auto flex  justify-between ">
          {/* md flex */}
          <div className="relative w-7/12 md:flex hidden items-center justify-between">
            <Link
              to="/"
              className=" flex items-center bg-[#5b11a9]  h-[48px] py-2 px-4 rounded-l-full  gap-2"
            >
              <img
                src="/assets/logo.png"
                alt=""
                className=" rounded  w-full h-full"
              />
              <h1 className="border-l px-2 text-xl font-semibold text-white opacity-80">
                Plago
              </h1>
            </Link>
            <form className="bg-[#f9e400] items-center overflow-hidden flex rounded-r-full w-full  text-black">
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
          <div className=" text-white flex gap-2 items-center relative">
            <div className=" group/basket relative">
              <button className="relative   ">
                <BsCart4 className=" p-1  text-4xl cursor-pointer" />
                <div className="flex items-center justify-center text-xs bg-red-700 font-semibold text-white rounded-full absolute -top-[2px] -right-[2px] w-[18px] h-[18px]">
                  {basket?.length}
                </div>
              </button>
              <div
                className={` group-hover/basket:flex  group-hover/basket:opacity-100  duration-500 hidden absolute top-full right-0 z-30   bg-white shadow-lg border  flex-col  w-[350px] max-h-[350px] opacity-0 rounded  `}
              >
                {/* OPTIONS */}
                <div className=" flex absolute  bottom-full  w-full justify-end pr-3 right-0 pt-5">
                  <BsFillTriangleFill />
                </div>
                <h1 className="text-black ml-5 mt-1 text-lg font-semibold border-b">
                  My Cart({basket.length} product)
                </h1>
                <div className="w-full flex-col flex items-start max-h-[300px] overflow-y-auto basketScroll">
                  {/* BASKET */}
                  {basket?.map((basket, i) => (
                    <div key={i} className="border-b   p-2 w-full  ">
                      <Link
                        to={`/productDetails/${basket.product._id}`}
                        className="flex items-center gap-2 p-1"
                      >
                        <div className="h-24 w-24 rounded-md overflow-hidden  flex items-center ">
                          <img
                            src={`${basket.product.picture[0]}`}
                            alt=""
                            className="object-contain rounded-md"
                          />
                        </div>
                        <div className="flex flex-col text-black w-4/6">
                          <h1 className="line-clamp-2">
                            <span className="font-semibold text-md">
                              {basket.product.caption}
                            </span>{" "}
                            <span className="text-gray-600 ">
                              {basket.product.description}
                            </span>
                          </h1>
                          <div className="flex text-sm gap-2 opacity-75">
                            <h1 className="text-gray-500 ">
                              Brand:{" "}
                              <span className="italic text-red-500">
                                {basket.product.brand}
                              </span>
                            </h1>
                            <h1 className="text-gray-500 ">
                              Piece:{" "}
                              <span className=" text-red-500 ">
                                {basket.amount}
                              </span>
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-lg font-light text-orange-500">
                              {basket.product.price}$
                            </h1>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="text-white p-2 px-10 bg-white w-full rounded-b-md shadow-md flex items-center justify-center">
                  <Link
                    to="/basket"
                    className="p-2  bg-emerald-500 w-full rounded-md font-semibold "
                  >
                    Go To Basket
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex  gap-2 items-center">
              <CiUser className="text-4xl font-semibold p-1 border-l  cursor-pointer" />
              <div className="flex flex-col ">
                {user.userName ? (
                  <div className="flex gap-2 items-center justify-center">
                    <div className=" group/user relative">
                      <h1 className="text-sm opacity-80">My Account</h1>
                      <h1 className="font-semibold underline hover:no-underline duration-150 capitalize cursor-pointer">
                        {user.userName}
                      </h1>
                      <div
                        className={` group-hover/user:flex  group-hover/user:opacity-100  duration-500 hidden absolute top-full right-0 mt-2 z-30   bg-white shadow-md  flex-col  w-[200px]  opacity-0 rounded `}
                      >
                        {/* OPTIONS */}
                        <div className=" flex absolute  bottom-full  w-full justify-end pr-3 text-[#fff] shadow-md right-0 pt-5">
                          <BsFillTriangleFill />
                        </div>
                        <Link
                          to={`/profile`}
                          className=" p-2 items-center gap-2 text-black font-semibold   flex hover:bg-[#bec2bef5] rounded-t "
                        >
                          <BsPerson className="text-lg" /> Your Account
                        </Link>
                        <Link
                          to={`/buymentHistory`}
                          className=" p-2 items-center gap-2 text-black font-semibold   flex hover:bg-[#bec2bef5] rounded-t "
                        >
                          <BiPurchaseTag className="text-lg" /> Purchase History
                        </Link>
                        <Link
                          to={`/myproducts/${user.userId}`}
                          className=" p-2 items-center gap-2 text-black font-semibold   flex hover:bg-[#bec2bef5] rounded-t  rounded"
                        >
                          <FaClipboardList className="text-lg" /> My Products
                        </Link>
                      </div>
                    </div>

                    <div>
                      {" "}
                      <button
                        className="  p-2 flex items-center gap-2  rounded-b  hover:scale-90 duration-500"
                        onClick={() => dispatch(logout())}
                      >
                        <BiLogIn className="text-5xl" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-sm opacity-80">My Account</h1>
                    <div className="flex items-center">
                      <Link
                        to="/register"
                        className="underline cursor-pointer hover:no-underline duration-150"
                      >
                        Sign In
                      </Link>
                      <RxDotFilled />
                      <Link
                        to="/login"
                        className="underline cursor-pointer hover:no-underline duration-150"
                      >
                        Log In
                      </Link>
                    </div>
                  </div>
                )}
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
