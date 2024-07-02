// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import bg1 from "../../../assets/images/carousel1.jpg";
import bg2 from "../../../assets/images/carousel2.jpg";
import bg3 from "../../../assets/images/carousel3.jpg";
import ScrollAnimation from "react-animate-on-scroll";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
const Banner = () => {
  return (
    <div className="container lg:px-8 lg:py-10 mx-auto">
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
          <Slide
            image={bg1}
            description={
              "Embark on a Gastronomic Journey and Savor the Finest Flavors at 'BEST TASTE' - Where Every Bite Tells a Story"
            }
            text={"Indulge Your Senses"}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bg2}
            description={
              "Embark on a Gastronomic Journey and Savor the Finest Flavors at 'BEST TASTE' - Where Every Bite Tells a Story"
            }
            text={"Indulge Your Senses"}
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            image={bg3}
            description={
              "Embark on a Gastronomic Journey and Savor the Finest Flavors at 'BEST TASTE' - Where Every Bite Tells a Story"
            }
            text={"Indulge Your Senses"}
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
