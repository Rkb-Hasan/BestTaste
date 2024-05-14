import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";

const SingleFood = () => {
  const food = useLoaderData();
  const {
    _id,
    food_image,
    food_name,
    food_category,
    price,
    made_by,
    food_origin,
    description,
    quantity,
  } = food;
  return (
    <section>
      <Helmet>
        <title>single Food</title>
      </Helmet>
      <div className="bg-[#8A2BE2] bg-opacity-10">
        <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-50">
          <h1 className="lg:text-4xl md:text-3xl text-xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50">
            {food_name}
          </h1>
          <div className="divider m-0 lg:mt-4 mt-2 bg-[#8A2BE2] md:h-1 h-[2px]"></div>
          <p className="bg-white p-2 rounded-2xl text-left bg-opacity-15 hover:bg-opacity-10  border-2 border-violet-800 lg:mt-8 mt-6 lg:text-lg  text-gray-50">
            {description}
          </p>
          <div className="flex w-full lg:text-lg lg:justify-center items-center gap-2 mt-4">
            <p className="font-bold">Category : {food_category}</p> |
            <p>
              <span className="font-bold ">Price</span> :{" "}
              <span className="font-semibold">{price}$</span>
            </p>{" "}
            |
            <p>
              <span className="font-bold ">Origin</span> :{" "}
              <span className="font-semibold">{food_origin}</span>
            </p>{" "}
          </div>
          <div className="flex lg:justify-center lg:text-lg w-full items-center gap-2 mt-1 mb-4">
            <p>
              <span className="font-bold ">Made-By</span> :{" "}
              <span className="font-semibold">{made_by}</span>
            </p>{" "}
            |
            <p>
              <span className="font-bold ">Quantity</span> :{" "}
              <span className="font-semibold">{quantity}</span>
            </p>{" "}
          </div>
          <div className="flex flex-wrap justify-center">
            <Link to={`/purchase/${_id}`}>
              <button
                type="button"
                className="lg:px-8  px-4 py-2   lg:py-3 lg:m-2 lg:text-lg md:font-bold font-semibold rounded-xl border  bg-violet-900 hover:bg-violet-400 text-gray-100 hover:text-black"
              >
                Purchase
              </button>
            </Link>
          </div>
        </div>
      </div>
      <img
        src={food_image}
        alt=""
        className="w-5/6 mx-auto mb-12 -mt-20 bg-gray-500 rounded-lg shadow-md lg:-mt-40"
      />
    </section>
  );
};

export default SingleFood;
