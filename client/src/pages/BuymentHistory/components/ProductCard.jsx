import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import "react-toastify/dist/ReactToastify.css";
import { getSingleProduct, leaveAComment } from "../../../helpers/Api";
import ReactStars from "react-stars";
import { uid } from "uid";

const ProductCard = ({ basket }) => {
  const [modal, setModal] = useState(false);
  const [temp, setTemp] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [buymentKey, setBuymentKey] = useState("");
  const [hasComment, setHasComment] = useState([]);
  const [startChanged, setStartChanged] = useState(0);
  const [renderCard, setRenderCard] = useState(1);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const ratingChanged = (newRating) => {
    setStartChanged(newRating);
  };
  useEffect(() => {
    getSingleProduct(basket.product._id).then((res) =>
      setHasComment(res.comments)
    );
  }, [basket.product._id, renderCard]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const comment = {
      _key: uid(),
      commentKey: buymentKey,
      userName: user.userName,
      caption,
      comment: description,
      star: startChanged,
      userId: user.userId,
    };
    setModal(false);
    leaveAComment(temp, comment).then(() => {
      setTemp("");
      setStartChanged(0);
      setCaption("");
      setDescription("");
      setLoading(false);
      setRenderCard(renderCard + 1);
    });
  };

  return (
    <div className="rounded-md border shadow-md  hover:shadow-emerald-500 duration-500 ">
      <div className="w-full flex justify-between bg-gray-200 rounded-t-md">
        <h1 className=" border-b w-full p-3 px-5 text-gray-600 opacity-80">
          Seller:{" "}
          <span className="text-red-400 font-semibold">
            {basket.product.brand}
          </span>
        </h1>

        {hasComment?.find((i) => i.commentKey === basket._key) ? (
          <div className="flex w-32">
            <ReactStars
              count={5}
              value={hasComment?.find((i) => i.commentKey === basket._key).star}
              edit={false}
              size={24}
              color2={"#ffd700"}
              className="select-none"
            />
          </div>
        ) : null}
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
          <span className="text-gray-600 ">{basket.product.description}</span>
        </p>
        <h1 className="text-lg text-orange-500 font-semibold">
          {basket.amount} X {parseInt(basket.product.price)}$
        </h1>
      </div>
      {hasComment?.find((i) => i.commentKey === basket._key) ? null : (
        <div
          className="w-full justify-center items-center flex p-2 border-t cursor-pointer group "
          onClick={(e) => {
            setModal(true);
            setTemp(basket.product._id);
            setBuymentKey(basket._key);
          }}
        >
          <h1 className="text-gray-500 text-lg font-semibold  group-hover:scale-105 duration-500">
            Review This Product!
          </h1>
        </div>
      )}

      {modal ? (
        <div className="w-screen h-screen backdrop-blur-md  fixed z-[999]  top-0 left-0 flex items-center justify-center">
          <div className="p-5 w-[500px]  bg-white rounded-md flex  flex-col justify-center items-center  shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full h-full"
            >
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Name:</label>
                <input
                  type="text"
                  className="p-2 rounded-md w-full border"
                  value={user.userName}
                  disabled
                  placeholder={user.userName}
                />
              </div>
              <div className="flex items-center justify-between  gap-1">
                <label className="font-semibold">Leave a Star:</label>
                <div className="mx-auto">
                  <ReactStars
                    count={5}
                    value={0 || startChanged}
                    onChange={ratingChanged}
                    size={50}
                    color2={"#ffd700"}
                    className="select-none"
                  />
                </div>
              </div>
              <div className="flex flex-col  gap-1">
                <label className="font-semibold">Caption:</label>
                <input
                  type="text"
                  className="p-2 rounded-md w-full bg-[#fafafa] border outline-none"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold">Descript:</label>
                <textarea
                  type="text"
                  className="p-2 rounded-md w-full bg-[#fafafa] outline-none border"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 font-semibold text-2xl rounded-md bg-emerald-500 text-white"
              >
                {" "}
                Submit Your Comment
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="w-screen h-screen backdrop-blur-md  fixed z-[999] top-0 left-0 flex items-center justify-center">
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

export default ProductCard;
