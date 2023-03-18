import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { AliExpressProducts, getProducts } from "../../../helpers/Api";
import ProductCard from "../../../components/ProductCard";
import Skeleton from "../../../components/Skeleton";
const TopRated = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProducts().then((res) => setData(res));
  }, []);
  return (
    <div>
      <div className="wrapper mx-auto">
        <h1 className="text-white  font-semibold text-2xl border-b py-3 my-5 ">
          Top Rated Products
        </h1>{" "}
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
          modules={[Autoplay, Pagination, Navigation]}
          className="h-[390px] forYouBanner rounded-md"
        >
          {data.length !== 0
            ? data?.map((product, i) => (
                <SwiperSlide key={i} className="h-full ">
                  <ProductCard product={product} color="white" />
                </SwiperSlide>
              ))
            : [...Array(5).keys()].map((skeleton, i) => (
                <SwiperSlide key={i} className="h-full ">
                  <Skeleton type="swiperProductCard" />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopRated;
