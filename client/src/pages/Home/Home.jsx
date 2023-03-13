import React, { useEffect } from "react";
import { AliExpressProducts } from "../../helpers/Api";

import Banner from "./components/Banner";
import Discounted from "./components/Discounted";
import Footer from "./components/Footer";
import ForYou from "./components/ForYou";
import TopRated from "./components/TopRated";

const Home = () => {
  return (
    <div className="bg-[#1a1a1a] ">
      <div className="w-full  mx-auto pt-5 flex flex-col gap-5">
        <Banner />
        <ForYou />
        <Discounted />
        <TopRated />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
