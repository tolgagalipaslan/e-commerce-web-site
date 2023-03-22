import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { evaluationCalculate } from "../helpers/Api";
import { Link } from "react-router-dom";
const ProductCard = ({ product, color }) => {
  const [evaluation, setEvaluation] = useState(0);
  useEffect(() => {
    evaluationCalculate(product._id).then((res) => setEvaluation(res));
  }, [product._id]);
  return (
    <div
      className={`flex flex-col w-full h-5/6 ${
        color === "white" ? "bg-[white] text-black" : "bg-[#1a1a1a] text-white"
      } p-2 rounded-md hover:shadow-purple-900 hover:shadow-md hover:scale-95 duration-300 border`}
    >
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
              value={evaluation}
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

export default ProductCard;
