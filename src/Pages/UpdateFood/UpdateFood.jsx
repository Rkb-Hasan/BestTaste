import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateFood = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    food_name,
    price,
    food_category,
    food_image,
    quantity,
    description,
  } = food;

  const handleUpdateFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const food_name = form.updatedFoodName.value;
    const price = form.updatedPrice.value;
    const food_category = form.updatedFoodCategoryName.value;
    const food_image = form.updatedFoodImage.value;
    const quantity = form.updatedQuantity.value;
    const description = form.updatedShortDescription.value;

    const updatedFood = {
      food_name,
      price,
      food_category,
      food_image,
      quantity,
      description,
    };
    // update the food
    fetch(
      `${import.meta.env.VITE_API_URL}/updateFood/${_id}`,

      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedFood),
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "Item updated",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/addedFoods");
        } else if (!data.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "No Update made!!",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate("/addedFoods");
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Best Taste|Update Food</title>
      </Helmet>
      <h3 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
        Update Food
      </h3>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>
      <form
        onSubmit={handleUpdateFood}
        className="border-2 bg-violet-500 text-black text-opacity-70  border-purple-950 rounded-2xl mx-auto lg:p-10 p-5 "
      >
        <div className="grid lg:grid-cols-2 lg:gap-20 mb-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="updatedFoodName"
                className="lg:text-xl text-lg font-bold "
              >
                Food Name
              </label>
              <br />
              <input
                type="text"
                name="updatedFoodName"
                defaultValue={food_name}
                required
                placeholder="Food name.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="updatedFoodCategoryName"
                className="lg:text-xl text-lg font-bold "
              >
                Food Category Name
              </label>
              <br />
              <input
                type="text"
                name="updatedFoodCategoryName"
                defaultValue={food_category}
                required
                placeholder="Food Category Name.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="updatedShortDescription"
                className="lg:text-xl text-lg font-bold "
              >
                Short Description
              </label>
              <br />
              <input
                type="text"
                name="updatedShortDescription"
                defaultValue={description}
                required
                placeholder="Short Description.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="updatedFoodImage"
                className="lg:text-xl text-lg font-bold "
              >
                Food Image
              </label>
              <br />
              <input
                type="text"
                name="updatedFoodImage"
                defaultValue={food_image}
                required
                placeholder="Image_URL.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="updatedPrice"
                className="lg:text-xl text-lg font-bold "
              >
                Price
              </label>
              <br />
              <input
                type="number"
                name="updatedPrice"
                defaultValue={price}
                min={1}
                required
                placeholder="Price.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="updatedQuantity"
                className="lg:text-xl text-lg font-bold "
              >
                Quantity
              </label>
              <br />
              <input
                type="number"
                name="updatedQuantity"
                defaultValue={quantity}
                required
                placeholder="Quantity.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
          </div>
        </div>

        <input
          type="submit"
          value="Update"
          className="w-full btn bg-purple-900 text-black hover:bg-violet-800 font-bold text-lg"
        />
      </form>
    </div>
  );
};

export default UpdateFood;
