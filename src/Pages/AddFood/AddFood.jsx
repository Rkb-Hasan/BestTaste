import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName } = user;
  //   console.log(email, displayName);
  const navigate = useNavigate();

  //
  const handleAddFood = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const price = form.price.value;
    const foodCategoryName = form.foodCategoryName.value;
    const foodImage = form.foodImage.value;
    const quantity = form.quantity.value;
    const userName = form.userName.value;
    const userEmail = form.userEmail.value;
    const shortDescription = form.shortDescription.value;

    // https://i.ibb.co/1RM7C7J/7-01-1024x683.jpg

    const newFood = {
      foodName,
      price,
      foodCategoryName,
      foodImage,
      quantity,
      userName,
      userEmail,
      shortDescription,
    };
    console.log(newFood);

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
          console.log(data);
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
        <title>Add Food</title>
      </Helmet>
      <h3 className="lg:text-4xl text-2xl font-bold  text-center">Add Food</h3>
      <div className="divider"></div>
      <form
        onSubmit={handleAddFood}
        className="border-2 rounded-2xl mx-auto lg:p-10 p-5 "
      >
        <div className="grid lg:grid-cols-2 lg:gap-20 mb-4">
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
          </div>
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
                type="text"
                name="price"
                required
                placeholder="Price.."
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
                required
                placeholder="Quantity.."
                className=" border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="lg:text-xl text-lg font-bold border rounded-2xl p-2 mb-2 bg-primary text-white text-center">
            Add By
          </p>

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
          className="w-full btn btn-primary font-bold text-lg"
        />
      </form>
    </div>
  );
};

export default AddFood;
