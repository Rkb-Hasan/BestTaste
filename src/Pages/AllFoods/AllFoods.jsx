import { useEffect, useState } from "react";
import axios from "axios";
import Food from "./Food";
import { useForm } from "react-hook-form";

const AllFoods = () => {
  const { reset } = useForm();

  // const { user } = useContext(AuthContext);
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  console.log(topFoods);

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
        setTopFoods(data);
      });
    form.reset();
  };

  return (
    <div>
      <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-center">
        All Foods
      </h2>
      <div className="divider"></div>
      <div className="flex flex-col">
        <form onSubmit={handleFoodSearch} className="flex justify-end">
          <label className="input border input-bordered rounded-r-none flex items-center gap-2">
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
            className="btn btn-primary rounded-l-none font-bold lg:text-lg"
          />
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 md:gap-3 gap-2 bg-base-200 p-5 border rounded-2xl my-6">
          {topFoods.map((food) => (
            <Food key={food._id} food={food}></Food>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFoods;
