import { useEffect, useState } from "react";
import axios from "axios";
import TopFood from "./TopFood";
import { Link } from "react-router-dom";
const TopFoods = () => {
  // const { user } = useContext(AuthContext);
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  console.log(topFoods);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/top-foods`);
    setTopFoods(data);
  };

  return (
    <div>
      <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-center">
        Top Foods
      </h2>
      <div className="divider"></div>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-3 gap-2 bg-base-200 p-5 border rounded-2xl my-6">
          {topFoods.map((top) => (
            <TopFood key={top._id} top={top}></TopFood>
          ))}
        </div>
        <div>
          <Link to="/allFoods">
            {" "}
            <button className="btn btn-secondary font-bold w-full lg:text-lg">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopFoods;
