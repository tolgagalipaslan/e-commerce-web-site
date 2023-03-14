import React from "react";
import ReactStars from "react-stars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ProductCard = ({ product, color }) => {
  return (
    <div
      className={`flex flex-col w-full h-5/6 ${
        color === "white" ? "bg-[white] text-black" : "bg-[#1a1a1a] text-white"
      } p-2 rounded-md hover:shadow-purple-900 hover:shadow-md hover:scale-95 duration-300 border`}
    >
      {/* IMAGE */}
      <div className=" w-full items-center flex  rounded-md p-2 justify-center">
        <LazyLoadImage
          effect="blur"
          className="h-[150px] "
          src={product.image}
          placeholderSrc={product.image}
          alt=""
        />
      </div>
      {/* PRODUCT CONTENT */}
      <div className=" w-full flex flex-col h-full">
        <h1 className="line-clamp-2 h-[50px]">{product.title}</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ReactStars
              count={5}
              value={product.rating.rate}
              size={24}
              edit={false}
              color2={"#ffd700"}
              className="select-none"
            />
            <h1 className="opacity-80 text-sm">({product.rating.count})</h1>
          </div>
          <h1 className="font-semibold">{product.rating.rate}</h1>
        </div>
        <h1 className="font-semibold mt-auto">{product.price}$</h1>
      </div>
    </div>
  );
};

export default ProductCard;
