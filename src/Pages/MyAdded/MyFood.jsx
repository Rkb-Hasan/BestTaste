import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyFood = ({ myFood, myFoods, setMyFoods }) => {
  const { _id, price, food_image, food_name, food_category } = myFood;

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/delete-food/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
              const remaining = myFoods.filter((fd) => fd._id !== _id);
              setMyFoods(remaining);
            }
          });
      }
    });
  };

  return (
    // <div className="card pb-2  bg-base-200 hover:shadow-xl">
    //   <Helmet>
    //     <title>My Food</title>
    //   </Helmet>
    //   <figure>
    //     <img src={food_image} alt={food_name} className=" lg:h-[280px]" />
    //   </figure>

    //   <div className="p-2 space-y-2">
    //     <div className="flex gap-1">
    //       <h2 className="card-title font-bold">{food_name}</h2>
    //     </div>
    //     <div className="flex items-center gap-2">
    //       <p className="text-green-500">
    //         <span className="font-bold text-red-500">Price</span> :{" "}
    //         <span className="font-semibold">{price}</span>
    //       </p>{" "}
    //     </div>
    //     {/* <div>
    //       <p className="text-green-500">
    //         <span className="font-bold text-orange-500">Processing Time</span> :{" "}
    //         <span className="font-semibold">#{processingTime}</span>
    //       </p>{" "}
    //     </div> */}
    //     {/* <div>
    //         <p className="flex gap-2 items-center text-xs font-bold">
    //           <span className="text-base"> Facilities : </span>
    //           <span className="bg-green-500 bg-opacity-10 p-1 rounded-lg">
    //             #{}
    //           </span>
    //           <span className="bg-red-500 bg-opacity-10 p-1 rounded-lg">#{}</span>
    //           <span className="bg-yellow-500 bg-opacity-10 p-1 rounded-lg">
    //             #{}
    //           </span>
    //         </p>
    //       </div> */}

    //     <div>
    //       <Link to={`/updateFood/${_id}`}>
    //         <button className=" btn w-full  bg-purple-500 font-bold text-lg ">
    //           Update
    //         </button>
    //       </Link>
    //       <Link to="">
    //         <button
    //           onClick={() => handleDelete(_id)}
    //           className=" btn w-full bg-red-500 font-bold text-lg "
    //         >
    //           Delete
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{
          backgroundImage: `url(${food_image})`,
        }}
      ></div>

      <div className="w-56 -mt-10 overflow-hidden bg-purple-950 rounded-lg shadow-lg md:w-64 ">
        <div className="flex justify-center">
          <h3 className="py-2  font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {food_name}
          </h3>
          <span className="text-xs text-white">({food_category})</span>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-purple-800 ">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            {price}$
          </span>

          <div className="space-x-2">
            <Link to={`/updateFood/${_id}`}>
              <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-violet-950 rounded hover:bg-gray-700  focus:bg-gray-700  focus:outline-none">
                Update
              </button>
            </Link>
            <Link to="">
              <button
                onClick={() => handleDelete(_id)}
                className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-red-500 rounded hover:bg-red-700  focus:bg-red-700  focus:outline-none"
              >
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFood;
