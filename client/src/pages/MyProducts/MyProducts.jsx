import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyProducts } from "../../helpers/Api";
import MyProductCard from "./components/MyProductCard";

const MyProducts = () => {
  const params = useParams();
  const [myProducts, setMyProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    getMyProducts(params.id).then((res) => setMyProducts(res));
  }, [params.id]);
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
      <div className="w-[1380px] grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1  mx-auto gap-4 ">
        {myProducts?.map((product, i) => (
          <MyProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
