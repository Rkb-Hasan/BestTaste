import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyFood = ({ myFood, myFoods, setMyFoods }) => {
  const { _id, price, food_image, food_name } = myFood;

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
    <div className="card pb-2  bg-base-200 hover:shadow-xl">
      <Helmet>
        <title>My Food</title>
      </Helmet>
      <figure>
        <img src={food_image} alt={food_name} className=" lg:h-[280px]" />
      </figure>

      <div className="p-2 space-y-2">
        <div className="flex gap-1">
          <h2 className="card-title font-bold">{food_name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-green-500">
            <span className="font-bold text-red-500">Price</span> :{" "}
            <span className="font-semibold">{price}</span>
          </p>{" "}
        </div>
        {/* <div>
          <p className="text-green-500">
            <span className="font-bold text-orange-500">Processing Time</span> :{" "}
            <span className="font-semibold">#{processingTime}</span>
          </p>{" "}
        </div> */}
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
          <Link to={`/updateFood/${_id}`}>
            <button className=" btn w-full  bg-purple-500 font-bold text-lg ">
              Update
            </button>
          </Link>
          <Link to="">
            <button
              onClick={() => handleDelete(_id)}
              className=" btn w-full bg-red-500 font-bold text-lg "
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyFood;
