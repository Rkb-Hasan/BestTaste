import { Link } from "react-router-dom";

const Slide = ({ image, text, description }) => {
  return (
    <div
      className="w-full bg-center bg-cover lg:h-[38rem] md:h-[30rem] h-[30rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#bc7fdd] lg:text-5xl">
            {text}
          </h1>
          <br />
          <p className="text-white lg:text-lg lg:font-semibold text-center px-8 md:px-0">
            {description}
          </p>
          <br />
          <Link
            to="/allFoods"
            className="w-full md:px-5 lg:py-4 p-2 mt-4 text-sm font-bold text-white capitalize transition-colors duration-300 transform bg-purple-600 rounded-md lg:w-auto hover:bg-purple-500 focus:outline-none focus:bg-purple-500"
          >
            All Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
