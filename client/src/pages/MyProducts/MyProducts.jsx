import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="w-full flex justify-end mt-3">
        <Link
          to={`/createproducts/${user.userId}`}
          className="bg-[#6fdd65] border mr-5 p-2 px-5 rounded-md flex items-center gap-2"
        >
          Create a Product <AiOutlinePlus />
        </Link>
      </div>
    </div>
  );
};

export default MyProducts;
