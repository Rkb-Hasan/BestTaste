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
      <h2 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] lg:mb-4 mb-2 font-bold text-center">
        Top Foods
      </h2>
      <div className="divider bg-[#8A2BE2] m-0  lg:h-1 h-[2px]"></div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right p-5 border rounded-2xl my-6">
          {topFoods.slice(0, 6).map((top) => (
            <TopFood key={top._id} top={top}></TopFood>
          ))}
        </div>
        <div>
          <Link to="/allFoods">
            {" "}
            <button className="btn text-white bg-[#8A2BE2] hover:bg-purple-600  font-bold w-full lg:text-lg">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopFoods;
