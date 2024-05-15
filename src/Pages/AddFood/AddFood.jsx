import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName } = user;

  const navigate = useNavigate();

  //
  const handleAddFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const food_name = form.foodName.value;
    const price = form.price.value;
    const food_category = form.foodCategoryName.value;
    const food_image = form.foodImage.value;
    const quantity = form.quantity.value;
    const description = form.shortDescription.value;
    const made_by = form.madeBy.value;
    const food_origin = form.foodOrigin.value;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const purchase_count = 0;

    const newFood = {
      food_name,
      price,
      food_category,
      food_image,
      food_origin,
      made_by,
      description,
      quantity: parseFloat(quantity),
      purchase_count,
      userName,
      userEmail,
    };

    // send to server
    fetch(`${import.meta.env.VITE_API_URL}/foods`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Item added",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/");
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Best Taste|Add Food</title>
      </Helmet>
      <h3 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
        Add Food
      </h3>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>
      <form
        onSubmit={handleAddFood}
        className="border-2 bg-violet-500 border-purple-900 rounded-2xl mx-auto lg:p-10 p-5 "
      >
        <div className="grid lg:grid-cols-2 lg:gap-20 mb-4">
          {/* ---------------------------- */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="foodName"
                className="lg:text-xl text-lg font-bold "
              >
                Food Name
              </label>
              <br />
              <input
                type="text"
                name="foodName"
                required
                placeholder="Food name.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="foodCategoryName"
                className="lg:text-xl text-lg font-bold "
              >
                Food Category Name
              </label>
              <br />
              <input
                type="text"
                name="foodCategoryName"
                required
                placeholder="Food Category Name.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="shortDescription"
                className="lg:text-xl text-lg font-bold "
              >
                Short Description
              </label>
              <br />
              <input
                type="text"
                name="shortDescription"
                required
                placeholder="Short Description.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="madeBy" className="lg:text-xl text-lg font-bold ">
                Made BY
              </label>
              <br />
              <input
                type="text"
                name="madeBy"
                required
                placeholder="Made By.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
          </div>

          {/* --------------------------- */}

          <div className="space-y-4">
            <div className="space-y-3">
              <label
                htmlFor="foodImage"
                className="lg:text-xl text-lg font-bold "
              >
                Food Image
              </label>
              <br />
              <input
                type="text"
                name="foodImage"
                required
                placeholder="Image_URL.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="price" className="lg:text-xl text-lg font-bold ">
                Price
              </label>
              <br />
              <input
                type="number"
                name="price"
                min={1}
                required
                placeholder="Price.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="foodOrigin"
                className="lg:text-xl text-lg font-bold "
              >
                Food Origin
              </label>
              <br />
              <input
                type="text"
                name="foodOrigin"
                required
                placeholder="Food Origin.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="quantity"
                className="lg:text-xl text-lg font-bold "
              >
                Quantity
              </label>
              <br />
              <input
                type="number"
                name="quantity"
                min={0}
                required
                placeholder="Quantity.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
          </div>
        </div>

        {/* ------------------------ */}

        <div className="mb-8 p-2 border bg-violet-700 rounded-2xl">
          <p className="lg:text-xl text-lg font-bold  m-2  text-black  text-opacity-70 text-center">
            Add By
          </p>
          <div className="divider m-0 mb-2 bg-slate-100 h-[1px]"></div>
          <div className="space-y-3 ">
            <div className="lg:flex lg:gap-20 ">
              <input
                type="text"
                name="userName"
                value={displayName}
                required
                placeholder="User Name.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full mb-4 lg:text-lg"
              />
              <input
                type="email"
                name="userEmail"
                required
                placeholder="User Email.."
                value={email}
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:mb-4  lg:text-lg"
              />
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Add"
          className="w-full btn bg-violet-600 hover:bg-purple-800 font-bold text-lg"
        />
      </form>
    </div>
  );
};

export default AddFood;
