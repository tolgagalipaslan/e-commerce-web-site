import React, { useEffect } from "react";
import { AliExpressProducts } from "../../helpers/Api";

import Banner from "./components/Banner";
import ForYou from "./components/ForYou";

const Home = () => {
  useEffect(() => {
    AliExpressProducts();
  }, []);
  return (
    <div className="bg-[#1a1a1a]">
      <div className="w-full wrapper mx-auto py-5 flex flex-col gap-5">
        <Banner />
        <ForYou />
      </div>
    </div>
  );
};

export default Home;
