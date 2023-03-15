import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { AliExpressProducts } from "../../../helpers/Api";
import ProductCard from "../../../components/ProductCard";
import Skeleton from "../../../components/Skeleton";
const Discounted = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    AliExpressProducts().then((res) => setData(res));
  }, []);
  return (
    <div className=" bg-[#83e6eb] relative">
      <div className="wrapper mx-auto py-2 ">
        <h1 className="text-black   font-semibold text-2xl border-b border-black py-3 my-5 ">
          Discounted Products
        </h1>{" "}
        <div className="absolute md:top-[-60px] top-[-10px]  md:right-[80px] right-[0px]">
          <img
            src="./assets/discount.png"
            alt=""
            className=" md:h-40 h-24 rotate-[-50deg]"
          />
        </div>
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            720: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
          loop
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="h-[350px] forYouBanner rounded-md  items-center"
        >
          {data.length !== 0
            ? data?.map((product, i) => (
                <SwiperSlide key={i} className="h-full ">
                  <ProductCard product={product} color="black" />
                </SwiperSlide>
              ))
            : [...Array(20).keys()].map((skeleton, i) => (
                <SwiperSlide key={i} className="h-full ">
                  <Skeleton type="swiperProductCard" />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Discounted;
