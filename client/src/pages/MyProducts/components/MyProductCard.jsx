import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { evaluationCalculate } from "../../../helpers/Api";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
const MyProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth.user);
  const [evaluation, setEvaluation] = useState();
  useEffect(() => {
    evaluationCalculate(product._id).then((res) => setEvaluation(res));
  }, [product._id]);
  return (
    <div
      className={`flex flex-col  w-full  text-black  min-h-[350px] p-2 rounded-md hover:shadow-purple-900 hover:shadow-md hover:scale-95 duration-300 border relative group`}
    >
      {user.userId === product.sellingBy._ref ? (
        <Link
          to={`/edit/${product._id}`}
          className="absolute  hidden p-3 font-semibold text-3xl text-purple-800 backdrop-blur-sm bg-slate-100 opacity-70 border rounded-full top-2 right-2 group-hover:flex cursor-pointer z-[999] hover:scale-105 duration-300 "
        >
          <AiOutlineEdit />
        </Link>
      ) : null}
      {/* IMAGE */}
      <Link
        to={`/productDetails/${product._id}`}
        className=" w-full items-center flex  rounded-md p-2 justify-center"
      >
        <LazyLoadImage
          effect="blur"
          className="h-[150px] "
          src={product.picture[0]}
          placeholderSrc={product.picture[0]}
          alt=""
        />
      </Link>

      {/* PRODUCT CONTENT */}
      <div className=" w-full flex flex-col h-full">
        <h1 className="line-clamp-2 h-[50px]">{product.caption}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ReactStars
              count={5}
              value={parseInt(evaluation)}
              size={24}
              edit={false}
              color2={"#ffd700"}
              className="select-none"
            />
            <h1 className="opacity-80 text-sm">
              {product?.comments?.length === undefined
                ? "(0)"
                : "(" + product?.comments?.length + ")"}
            </h1>
          </div>
          <h1 className="font-semibold">{evaluation}</h1>
        </div>
        <h1 className="font-semibold mt-auto">{product.price}$</h1>
      </div>
    </div>
  );
};

export default MyProductCard;
