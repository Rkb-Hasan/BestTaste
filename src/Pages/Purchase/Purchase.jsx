import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const Purchase = () => {
  const food = useLoaderData();
  const { _id, food_name, price, quantity, food_image, userEmail } = food;

  const { user } = useContext(AuthContext);

  const [purchased, setPurchased] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quantity) {
      Swal.fire({
        title: "Oppps!",
        text: "Sorry! Item is not available!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    fetch(`${import.meta.env.VITE_API_URL}/purchase/${user?.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPurchased(data);
      });
  }, [quantity, user?.email]);

  const handlePurchase = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const buyDate = new Date(Date.now()).toLocaleString();

    const purchasedFood = {
      foodName,
      foodImage,
      price,
      quantity: parseFloat(quantity),
      buyerName,
      buyerEmail,
      buyDate,
    };

    // validate user
    if (buyerEmail === userEmail) {
      return Swal.fire({
        title: "Ooopss!!",
        text: "Sorry! Can not buy self added-items!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }

    // ------------------------
    const checkDuplicate = purchased.find(
      (prchase) => prchase.foodName === food_name
    );

    let itemFound = false;
    // if already exist the item don't add just update the quantity
    if (checkDuplicate) {
      fetch(`${import.meta.env.VITE_API_URL}/updatePurchaseQuantity/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(purchasedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            Swal.fire({
              title: "Success!",
              text: "Updated the previous order for this food!!",
              icon: "success",
              confirmButtonText: "OK",
            });
          }

          navigate("/");
        });
      itemFound = true;
    }

    if (!itemFound) {
      // else send to server
      // send to purchase collection
      fetch(`${import.meta.env.VITE_API_URL}/purchases`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(purchasedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            console.log(data);
            Swal.fire({
              title: "Success!",
              text: "Food Purchased!!",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/");
          }
        });
    }
    // update the purchase and new product quantity value in the foods collection

    if (!itemFound) {
      fetch(`${import.meta.env.VITE_API_URL}/updatePurchaseQuantity/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(purchasedFood),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="hero">
      <Helmet>
        <title>Purchase</title>
      </Helmet>
      <div className="hero-content flex-col animate__animated animate__pulse">
        <div className="text-center ">
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
            Purchase
          </h1>
        </div>
        <div className="card shrink-0 w-full md:min-w-[600px] min-w-[400px] hover:shadow-2xl bg-base-100   ">
          <form
            onSubmit={handlePurchase}
            className="card-body   bg-violet-500 text-black text-opacity-70 border-2 border-purple-950 rounded-2xl   "
          >
            <div className="form-control">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Food Name</span>
              </label>
              <input
                required
                name="foodName"
                type="text"
                placeholder="Food Name"
                defaultValue={food_name}
                className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="form-control">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Price</span>
              </label>
              <input
                required
                name="price"
                type="text"
                placeholder="Price"
                defaultValue={price}
                className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="form-control">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Quantity</span>
              </label>
              <input
                // onChange={handleValue}
                required
                name="quantity"
                type="number"
                placeholder="Quantity"
                defaultValue={quantity}
                max={quantity}
                min={1}
                className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />

              <div className="space-y-3">
                <label
                  className="lg:text-xl text-lg font-bold"
                  htmlFor="foodImage"
                >
                  Food Image
                </label>
                <br />
                <input
                  required
                  type="text"
                  name="foodImage"
                  defaultValue={food_image}
                  placeholder="Image_URL.."
                  className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg "
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Buyer Name</span>
              </label>
              <input
                required
                name="buyerName"
                type="text"
                placeholder="Buyer Name"
                value={user?.displayName}
                className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>
            <div className="form-control">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Buyer Email</span>
              </label>
              <input
                required
                name="buyerEmail"
                type="email"
                placeholder="Buyer Email"
                value={user?.email}
                className="input input-bordered  border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            {/* <div className="flex flex-col gap-2 ">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Buying Date</span>
              </label>

              <input
                type="time"
                name="buyDate"
                className="input input-bordered border-2 focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
                defaultValue={new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              /> */}
            {/* <DatePicker
                name="buyDate"
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border-2  focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              /> */}
            {/* </div> */}

            <div className="form-control mt-6">
              <button
                disabled={!quantity}
                className="btn bg-purple-950 text-slate-300 hover:bg-purple-800 hover:text-gray-900 disabled:bg-slate-300 disabled:text-gray-500 font-bold lg:text-lg"
              >
                Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
