import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyPurchase = ({ myPurchase, myPurchases, setMyPurchases }) => {
  const { _id, price, foodImage, foodName } = myPurchase;

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
        fetch(`${import.meta.env.VITE_API_URL}/purchases/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
              const remaining = myPurchases.filter(
                (prchase) => prchase._id !== _id
              );
              setMyPurchases(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <Helmet>
        <title>Best Taste|My Purchase</title>
      </Helmet>
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{
          backgroundImage: `url(${foodImage})`,
        }}
      ></div>

      <div className="w-56 -mt-10 overflow-hidden bg-purple-950 rounded-lg shadow-lg md:w-64 ">
        <div className="flex justify-center">
          <h3 className="py-2  font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {foodName}
          </h3>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-purple-800 ">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            {price}$
          </span>

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
  );
};

export default MyPurchase;
