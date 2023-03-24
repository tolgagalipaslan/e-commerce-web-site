import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { evaluationCalculate } from "../../../helpers/Api";

const SearchedProducts = ({ data }) => {
  const [evaluation, setEvaluation] = useState();
  useEffect(() => {
    evaluationCalculate(data._id).then((res) => setEvaluation(res));
  }, [data._id]);
  return (
    <div
      className={`flex flex-col  w-full  text-black  min-h-[350px] p-2 rounded-md hover:shadow-purple-900 hover:shadow-md hover:scale-95 duration-300 border relative `}
    >
      {/* IMAGE */}
      <Link
        to={`/productDetails/${data._id}`}
        className=" w-full items-center flex  rounded-md p-2 justify-center"
      >
        <LazyLoadImage
          effect="blur"
          className="h-[150px] "
          src={data.picture[0]}
          placeholderSrc={data.picture[0]}
          alt=""
        />
      </Link>

      {/* data CONTENT */}
      <div className=" w-full flex flex-col h-full">
        <h1 className="line-clamp-2 h-[50px]">{data.caption}</h1>
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
              {data?.comments?.length === undefined
                ? "(0)"
                : "(" + data?.comments?.length + ")"}
            </h1>
          </div>
          <h1 className="font-semibold">{evaluation}</h1>
        </div>
        <h1 className="font-semibold mt-auto">{data.price}$</h1>
      </div>
    </div>
  );
};

export default SearchedProducts;
