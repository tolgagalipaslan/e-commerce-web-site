import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
const Banner = () => {
  return (
    <div className="pt-5">
      <div className="wrapper mx-auto ">
        {" "}
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          effect={"fade"}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="homeBanner h-[440px] bg-black rounded-md"
        >
          <SwiperSlide className="h-full bg-[url('https://n11scdn.akamaized.net/a1/1180_440/23/03/13/67/79/10/03/18/74/67/05/61/43154364260766498091.jpg')] bg-cover bg-center"></SwiperSlide>
          <SwiperSlide className="h-full bg-[url('https://n11scdn.akamaized.net/a1/1180_440/23/03/13/86/53/30/05/47/86/82/77/93/35780115108132376564.jpg')] bg-cover bg-center"></SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
