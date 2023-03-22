import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImBin, ImSpinner2 } from "react-icons/im";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { deleteProductFromBasket, getSingleUser } from "../../helpers/Api";
import { getUserBasket } from "../../store/basket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Basket = () => {
  const basket = useSelector((state) => state.basket.basket);
  const user = useSelector((state) => state.auth.user);
  const [userName, setUserName] = useState();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const succes = (message) => toast.success(message);
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {basket?.length === 0 ? (
        <div className="w-full h-[88vh] flex justify-center items-center">
          <h1 className="text-4xl text-gray-500 font-semibold opacity-70 ">
            Your Cart Is Empty ! :(
          </h1>
        </div>
      ) : (
        <div className="w-[1380px] flex  gap-5 mx-auto p-2 relative">
          <div className=" w-5/6 flex flex-col gap-5 mx-auto p-2">
            {basket?.map((basket, i) => (
              <div
                key={i}
                className="rounded-md border shadow-md h-[200px] hover:shadow-emerald-500 duration-500"
              >
                <div className="w-full flex  bg-gray-200 rounded-t-md">
                  <h1 className=" border-b w-full p-3 px-5 text-gray-600 opacity-80">
                    Seller:{" "}
                    <span className="text-red-400 font-semibold">
                      {basket.product.brand}
                    </span>
                  </h1>
                </div>
                <div className="w-full flex mx-auto justify-between items-center  p-3 px-5">
                  <img
                    src={basket.product.picture[0]}
                    alt=""
                    className="bg-black w-32 h-32 rounded-md shadow-md hover:scale-95 duration-500"
                  />
                  <p className="line-clamp-1 h-full  w-[800px] ">
                    <span className="font-semibold text-md">
                      {basket.product.caption}
                    </span>{" "}
                    <span className="text-gray-600 ">
                      {basket.product.description}
                    </span>
                  </p>
                  <h1 className="text-lg text-orange-500 font-semibold">
                    {basket.product.price}$
                  </h1>
                  <ImBin
                    className="cursor-pointer hover:scale-150  duration-500"
                    onClick={(e) => {
                      setModal(true);
                      deleteProductFromBasket(
                        user.userId,
                        basket.product._id
                      ).then((res) => {
                        dispatch(getUserBasket(res));
                        setModal(false);
                        succes("Succesfully Removed!");
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/6 ">
            <div className="sticky top-0 right-0 pt-[10vh] w-full ">
              <div className="flex flex-col mx-auto w-full gap-5 ">
                <div className="flex flex-col gap-2 p-2 border rounded-md opacity-75">
                  <div className="text-2xl font-semibold">Order summary</div>
                  <div>
                    <strong>Product total: </strong> <span></span>
                  </div>
                  <div className="border-b">
                    <strong>Cargo: </strong> Free
                  </div>
                  <div>
                    <strong>Total: </strong> {/* TOTAL API */}
                    <span className="text-green-400">5$</span>
                  </div>
                </div>
                <button className="rounded-md text-white text-lg font-semibold bg-red-700 flex items-center justify-center gap-2 py-2">
                  Confirm cart <AiOutlineDoubleRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modal ? (
        <div className="w-full h-full backdrop-blur-md  absolute top-0 left-0 flex items-center justify-center">
          <div className="w-[400px] h-28  bg-white rounded-md flex  flex-col justify-center items-center  shadow-lg">
            <ImSpinner2 className="animate-spin text-orange-600 text-3xl" />
            <h1 className="font-semibold border-b">
              Please wait, the process continues
            </h1>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Basket;
