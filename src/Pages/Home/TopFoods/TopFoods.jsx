import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TopFood from "./TopFood";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
const TopFoods = () => {
  const { loading } = useContext(AuthContext);
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  // console.log(topFoods);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/top-foods`);
    setTopFoods(data);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        {" "}
        <span className="loading loading-spinner loading-lg "></span>
      </div>
    );
  return (
    <div className="mt-10">
      <h2 className="lg:text-5xl md:text-4xl text-3xl text-purple-950 lg:mb-4 mb-2 font-bold text-center">
        Top Foods
      </h2>
      <div className="divider bg-[#511b4b] m-0  lg:h-1 h-[2px]"></div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-3 gap-2 bg-[#8E4585] bg-opacity-30 p-5 border rounded-2xl my-6">
          {topFoods.slice(0, 6).map((top) => (
            <TopFood key={top._id} top={top}></TopFood>
          ))}
        </div>
        <div>
          <Link to="/allFoods">
            {" "}
            <button className="btn text-white bg-[#7D3C98] hover:bg-purple-600  font-bold w-full lg:text-lg">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopFoods;
