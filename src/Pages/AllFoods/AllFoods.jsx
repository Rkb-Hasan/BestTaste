import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Food from "./Food";
import bgImg from "../../assets/images/allbgjpg.jpg";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const AllFoods = () => {
  const [topFoods, setTopFoods] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [errState, setErrState] = useState(false);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-foods`);
    setTopFoods(data);
  };

  const handleFoodSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const foodName = form.foodName.value;

    const foodQuery = {
      foodName,
    };
    console.log(foodQuery);

    fetch(
      `${import.meta.env.VITE_API_URL}/searchFood?foodName=${
        foodQuery.foodName
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
        if (data.length === 0) {
          setErrState(true);
          setErrMessage(
            "No Item found with this name!! Please try again with a valid one!"
          );
        } else {
          setTopFoods(data);
          setErrMessage("");
          setErrState(false);
        }
      });
    form.reset();
  };
  console.log(errState, errMessage);
  return (
    <div>
      <Helmet>
        <title>Best Taste|All Foods</title>
      </Helmet>
      <div
        className="w-full bg-center bg-cover h-[25rem]   rounded-2xl"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <h3 className="flex flex-col justify-center items-center w-full h-full bg-gray-900/70 text-5xl font-extrabold text-white rounded-2xl text-opacity-85">
          ALL FOODS
        </h3>
      </div>

      <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center mt-10">
        Food Cards
      </h2>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      <div className="flex flex-col">
        <form onSubmit={handleFoodSearch} className="flex justify-end ">
          <label className="input border input-bordered rounded-r-none  flex items-center gap-2">
            <input
              name="foodName"
              type="text"
              className="grow"
              placeholder="Search by name.."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <input
            type="submit"
            value="Search"
            className="btn bg-violet-950 text-white hover:bg-violet-800  rounded-l-none font-bold lg:text-lg"
          />
        </form>

        {errState ? (
          <p className="text-red-500 font-bold text-center w-full">
            {errMessage}
          </p>
        ) : loading ? (
          <div className="text-center mr-10">
            {" "}
            <span className="loading loading-spinner loading-md text-white"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5  rounded-2xl my-6">
            {topFoods.map((food) => (
              <Food key={food._id} food={food}></Food>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFoods;
