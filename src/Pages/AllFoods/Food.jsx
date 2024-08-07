import { Link } from "react-router-dom";

const Food = ({ food }) => {
  const { _id, food_name, food_category, food_image, price, quantity } = food;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{
          backgroundImage: `url(${food_image})`,
        }}
      ></div>

      <div className="w-64 -mt-10 overflow-hidden bg-purple-950 rounded-lg shadow-lg  ">
        <div className="flex justify-center">
          <h3 className="py-2  font-bold tracking-wide text-center text-gray-800  dark:text-white">
            {food_name}
          </h3>
          <span className="text-xs text-white">({food_category})</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-purple-800 ">
          <div className="flex">
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {price}$
            </span>
            <span className="text-xs text-white ">
              (Qty Available : {quantity})
            </span>
          </div>
          <Link to={`/food/${_id}`}>
            <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-violet-950 rounded hover:bg-gray-700  focus:bg-gray-700  focus:outline-none">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Food;
