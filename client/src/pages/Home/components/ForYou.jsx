import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
const ForYou = () => {
  return (
    <div>
      {" "}
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
        className="h-[440px] homeBanner rounded-md"
      >
        <SwiperSlide className="h-full bg-[url('https://n11scdn.akamaized.net/a1/1180_440/23/03/13/67/79/10/03/18/74/67/05/61/43154364260766498091.jpg')] bg-cover bg-center"></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ForYou;
