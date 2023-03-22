import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CounterInput from "react-counter-input";

import {
  addBasket,
  calcMaxAmount,
  evaluationCalculate,
  getSingleProduct,
  getSingleUser,
} from "../../helpers/Api";
import { AiOutlinePlus, AiOutlineHeart } from "react-icons/ai";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../../utils/client";
import { getUserBasket } from "../../store/basket";
import { ImSpinner2 } from "react-icons/im";
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productUser, setProductUser] = useState({});
  const [evaluation, setEvaluation] = useState();
  const [updater, setUpdater] = useState(0);
  const [mainPic, setMainPic] = useState("");
  const [maxAmount, setMaxAmount] = useState(1);
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getSingleProduct(params.id).then((res) => {
      setProduct(res);
      getSingleUser(res.sellingBy._ref).then((res) => setProductUser(res));
      evaluationCalculate(params.id).then((res) => setEvaluation(res));
      calcMaxAmount(user.userId, res._id, res.stock).then((res) => {
        setMaxAmount(res);
      });
      const query = `*[_type == "user" && subId == "${user.userId}"][0]`;
      client.fetch(query).then((res) => dispatch(getUserBasket(res.basket)));
    });
  }, [maxAmount, params.id, user.userId, updater]);
  return (
    <div className=" w-full h-screen pt-5">
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
      {/* UPLOAD PHOTO */}
      <div className="w-[1380px]  flex mx-auto  border-2 rounded-md">
        <div className="w-2/6 h-[700px]  rounded-md mx-auto flex flex-col justify-around p-1">
          <div className="w-full h-4/6 overflow-hidden rounded-md">
            {product?.picture ? (
              mainPic === "" ? (
                <img
                  src={product?.picture[0]}
                  alt=""
                  className="h-full w-full rounded-md object-contain border  p-1"
                />
              ) : (
                <img
                  src={mainPic}
                  alt=""
                  className="h-full w-full rounded-md object-contain border p-1 "
                />
              )
            ) : null}
          </div>
          <div className="w-full h-1/6  flex justify-center gap-3 items-center">
            {/* PHOTO SHOW */}
            {product?.picture?.map((picture, i) => (
              <div
                key={i}
                className="h-[60px] w-[60px] bg-white  border p-2 border-gray-400  rounded-md relative"
              >
                <img
                  src={picture}
                  alt=""
                  className="h-full w-full  rounded-md object-contain"
                  onClick={(e) => {
                    setMainPic(picture);
                  }}
                />
                <div className="absolute top-0 right-0 rounded-full hover:bg-[#1a1a1a] hover:text-white"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/6 h-[600px]  mx-auto items-center justify-center rounded-md py-5">
          <div className=" border-b p-2">
            <h1 className="text-xl font-semibold">{product?.caption}</h1>
            <h1 className="text-sm opacity-70">
              Seller:{" "}
              <Link
                to={`/myproducts/${productUser.subId}`}
                className="text-red-500 font-semibold"
              >
                {productUser?.userName}
              </Link>
            </h1>
            <h1 className="text-sm opacity-70">
              Brand:{" "}
              <span className="text-red-500 font-semibold">
                {product.brand}
              </span>
            </h1>

            <div className="flex items-center">
              <ReactStars
                count={5}
                value={evaluation}
                size={24}
                edit={false}
                color2={"#ffd700"}
                className="select-none"
              />
              <span>
                {" "}
                {product?.comments?.length === undefined
                  ? "(0)"
                  : "(" + product?.comments?.length + ")"}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-orange-500">
              {product.price} $
            </h1>
            <div>
              {maxAmount === 0 ? (
                <div className="border  text-xl  font-semibold text-mainRed w-fit p-2 rounded-md my-2 opacity-80">
                  Out of <span className="text-red-500 ">stock</span>
                </div>
              ) : (
                <CounterInput
                  min={1}
                  count={amount}
                  max={parseInt(maxAmount)}
                  onCountChange={(count) => setAmount(count)}
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                className="w-5/6 bg-emerald-500 p-2 rounded-md text-white font-semibold flex justify-center items-center hover:scale-105 duration-500"
                disabled={loading || maxAmount === 0}
                onClick={async () => {
                  setLoading(true);
                  await addBasket(user.userId, product._id, amount);

                  setUpdater(updater + 1);
                  setAmount(1);
                  setLoading(false);
                }}
              >
                {loading ? (
                  <div className="flex items-center animate-spin font-semibold h-[30px]">
                    <ImSpinner2 />
                  </div>
                ) : maxAmount === 0 ? (
                  <div className="flex items-center h-[30px]">Out Of Stock</div>
                ) : (
                  <div className="flex items-center h-[30px]">
                    <AiOutlinePlus className="font-semibold" /> Add to Cart
                  </div>
                )}
              </button>
              <button className=" border p-2 rounded-md hover:bg-purple-400 duration-500  font-semibold flex justify-center items-center text-black  hover:text-white">
                <AiOutlineHeart className="font-semibold text-2xl " />
              </button>
            </div>
            <div className="w-full flex justify-end text-sm opacity-70 text-gray-600 items-center">
              <AiOutlineHeart className="font-semibold  " />
              {product?.likes?.length === undefined
                ? "(0)"
                : "(" + product?.comments?.likes + ")"}{" "}
              likes
            </div>
          </div>
          <div className="border rounded-md mt-5 p-2">
            <h1 className="py-2  font-semibold">Product Description</h1>
            <p className="opacity-90 text-gray-700 line-clamp-15">
              {product.description}
            </p>
          </div>
        </div>
      </div>{" "}
      <div className="bg-[#edeff3] mt-3">
        <div className="w-[1380px]  flex flex-col mx-auto  rounded-md ">
          <div className="w-full flex justify-start ">
            <h1 className="border-b-2 border-purple-900 p-2 px-3 text-xl font-semibold">
              Comments
            </h1>
          </div>
          <div>
            {product?.comments?.length === undefined ? (
              <div className=" text-gray-500 opacity-70 text-2xl">
                No Comments Here
              </div>
            ) : (
              product?.comments?.map((comment, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 bg-orange-100 p-3 rounded-md border-b border-orange-300"
                >
                  {/* comment start caption */}
                  <div className="flex  items-center gap-3  ">
                    <ReactStars
                      count={5}
                      value={comment.star}
                      size={24}
                      edit={false}
                      color2={"#ffd700"}
                      className="select-none"
                    />
                    <h1 className="font-semibold text-xl">{comment.caption}</h1>
                  </div>
                  <div>{comment.comment}</div>
                  <div className="flex opacity-75 text-gray-600 text-sm gap-2">
                    <h1>{comment.userName}</h1>
                    <h1>| 3/18/203</h1>
                    <h1>
                      | Bought the product from{" "}
                      <span className="font-semibold text-red-500">
                        {productUser.userName}
                      </span>
                    </h1>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ProductDetails;
