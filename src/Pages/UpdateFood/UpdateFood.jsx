// import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

// import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const UpdateFood = () => {
  //   const { user } = useContext(AuthContext);
  //   const { email } = user;
  // const { reset } = useForm();
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
  console.log(food);
  const handleUpdateFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const food_name = form.updatedFoodName.value;
    const price = form.updatedPrice.value;
    const food_category = form.updatedFoodCategoryName.value;
    const food_image = form.updatedFoodImage.value;
    const quantity = form.updatedQuantity.value;
    const description = form.updatedShortDescription.value;

    // https://i.ibb.co/1RM7C7J/7-01-1024x683.jpg

    const updatedFood = {
      food_name,
      price,
      food_category,
      food_image,
      quantity,
      description,
    };

    fetch(`${import.meta.env.VITE_API_URL}/updateFood/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        <title>Add Food</title>
      </Helmet>
      <h3 className="lg:text-4xl text-2xl font-bold  text-center">Add Food</h3>
      <div className="divider"></div>
      <form
        onSubmit={handleUpdateFood}
        className="border-2 rounded-2xl mx-auto lg:p-10 p-5 "
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
                type="text"
                name="updatedPrice"
                defaultValue={price}
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
          className="w-full btn btn-primary font-bold text-lg"
        />
      </form>
    </div>
  );
};

export default UpdateFood;
