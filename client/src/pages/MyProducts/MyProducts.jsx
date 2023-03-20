import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import CounterInput from "react-counter-input";
import { Link, useParams } from "react-router-dom";
import {
  evaluationAllCalculate,
  getMyProducts,
  getMyProductsSortedByHighest,
  getMyProductsSortedByPriceLowest,
  getSingleUser,
} from "../../helpers/Api";
import MyProductCard from "./components/MyProductCard";

const MyProducts = () => {
  const params = useParams();
  const [myProducts, setMyProducts] = useState([]);
  const [seller, setSeller] = useState({});
  const [productFilter, setProductFilter] = useState("new");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    filterProducts();
    getSingleUser(params.id).then((res) => setSeller(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, productFilter]);

  //filter Products
  const filterProducts = () => {
    if (productFilter === "lowest") {
      getMyProductsSortedByPriceLowest(params.id).then((res) =>
        setMyProducts(res)
      );
    } else if (productFilter === "highest") {
      getMyProductsSortedByHighest(params.id).then((res) => setMyProducts(res));
    } else if (productFilter === "new") {
      getMyProducts(params.id).then((res) => setMyProducts(res));
    } else {
      evaluationAllCalculate(params.id).then((res) => setMyProducts(res));
    }
  };
  return (
    <div>
      <div className="w-full flex justify-end mt-3">
        <div>
          <div></div>
          {user.userId === params.id ? (
            <Link
              to={`/createproducts`}
              className="bg-[#6fdd65] border mr-5 p-2 px-5 rounded-md flex items-center gap-2"
            >
              Create a Product <AiOutlinePlus />
            </Link>
          ) : null}
        </div>
      </div>
      <div>
        <div className="w-[1380px] mx-auto flex items-center justify-between">
          <div className="flex items-end gap-2">
            <h1 className="text-xl font-semibold opacity-90 text-gray-700">
              {seller.userName}
            </h1>
            <h1 className=" flex items-center gap-2 opacity-60 text-gray-500">
              {myProducts.length} <span className="italic">items</span>
            </h1>
          </div>
          <select
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value);
            }}
            className="p-2 border px-5 shadow-md outline-none mb-5 text-gray-500"
            name="filter"
            id="filter"
          >
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
            <option value="new">New Arrivals</option>
            <option value="rated">Most Rated</option>
          </select>
        </div>
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
