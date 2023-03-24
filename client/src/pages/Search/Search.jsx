import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchProduct } from "../../helpers/Api";
import SearchedProducts from "./components/SearchedProducts";

const Search = () => {
  const [data, setData] = useState();
  const [sortQuery, setSortQuery] = useState("_createdAt desc");
  const { searchQuery } = useParams();
  useEffect(() => {
    searchProduct(searchQuery, sortQuery).then((res) => {
      setData(res);
    });
  }, [searchQuery, sortQuery]);

  console.log(data);
  return (
    <div>
      <div className="w-[1380px] mx-auto flex items-center justify-between mt-5">
        <select
          value={sortQuery}
          onChange={(e) => {
            setSortQuery(e.target.value);
          }}
          className="p-2 border px-5 shadow-md outline-none mb-5 text-gray-500"
          name="filter"
          id="filter"
        >
          <option value="price desc">Lowest Price</option>
          <option value="price asc">Highest Price</option>
          <option value="_createdAt desc">New Arrivals</option>
        </select>
      </div>
      <div className="w-[1380px] grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1  mx-auto gap-4 ">
        {data?.map((data, i) => (
          <SearchedProducts data={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Search;
