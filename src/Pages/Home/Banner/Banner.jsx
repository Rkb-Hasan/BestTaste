// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bg1 from "../../../assets/images/carousel1.jpg";
import bg2 from "../../../assets/images/carousel2.jpg";
import bg3 from "../../../assets/images/carousel3.jpg";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
const Banner = () => {
  return (
    <div className="container px-8 py-10 mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={bg1} text={"etxt text text text"}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bg2} text={"etxt text text text"}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={bg3} text={"etxt text text text"}></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
