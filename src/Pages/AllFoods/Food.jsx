import { Link } from "react-router-dom";

const Food = ({ food }) => {
  const { _id, food_name, food_category, food_image, price, quantity } = food;

  return (
    <div className="card pb-2  bg-base-200 hover:shadow-xl">
      <figure>
        <img src={food_image} alt={food_name} className="lg:h-[280px]" />
      </figure>

      <div className="p-2 space-y-2">
        <h2 className="card-title font-bold">{food_name}</h2>
        <div className="flex items-center gap-2">
          <p className="font-bold">#{food_category}</p> |
          <p className="text-green-500">
            <span className="font-bold text-red-500">Price</span> :{" "}
            <span className="font-semibold">{price} $</span>
          </p>{" "}
          |
          <p className="text-green-500">
            <span className="font-bold text-red-500">Price</span> :{" "}
            <span className="font-semibold">{quantity}</span>
          </p>{" "}
        </div>

        {/* <div>
          <p className="flex gap-2 items-center text-xs font-bold">
            <span className="text-base"> Facilities : </span>
            <span className="bg-green-500 bg-opacity-10 p-1 rounded-lg">
              #{}
            </span>
            <span className="bg-red-500 bg-opacity-10 p-1 rounded-lg">#{}</span>
            <span className="bg-yellow-500 bg-opacity-10 p-1 rounded-lg">
              #{}
            </span>
          </p>
        </div> */}

        <div>
          <Link to={`/food/${_id}`}>
            <button className=" btn w-full btn-primary font-bold text-lg ">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Food;