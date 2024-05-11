import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const Purchase = () => {
  const food = useLoaderData();
  const { _id, food_name, price, quantity, food_image, userEmail } = food;
  // console.log(food);
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const handlePurchase = (e) => {
    e.preventDefault();

    const form = e.target;
    const foodName = form.foodName.value;
    const foodImage = form.foodImage.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;

    // https://i.ibb.co/1RM7C7J/7-01-1024x683.jpg

    const purchasedFood = {
      foodName,
      foodImage,
      price,
      quantity: parseFloat(quantity),
      buyerName,
      buyerEmail,
    };
    // console.log(purchasedFood);
    if (buyerEmail === userEmail) {
      return Swal.fire({
        title: "Alert",
        text: "Sorry! Can not buy self added-items!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    // update the purchase and quantity value in the foods collection
    fetch(`${import.meta.env.VITE_API_URL}/updatePurchaseQuantity/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(purchasedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.insertedId) {
        //   console.log(data);
        //   Swal.fire({
        //     title: "Success!",
        //     text: "Food Purchased!!",
        //     icon: "success",
        //     confirmButtonText: "OK",
        //   });
        //   navigate("/");
        // }
        console.log(data);
      });

    // ------------------------
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
  };

  useEffect(() => {
    if (!quantity) {
      Swal.fire({
        title: "Oppps!",
        text: "Sorry! Item is not available!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [quantity]);

  // const handleValue = (e) => {
  //   const val = e.target.value;
  //   if (val === 30) {
  //     Swal.fire({
  //       title: "Opps!",
  //       text: "Cant buy more!!",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  // };

  return (
    <div className="hero">
      <Helmet>
        <title>Purchase</title>
      </Helmet>
      <div className="hero-content flex-col animate__animated animate__pulse">
        <div className="text-center ">
          <h1 className="lg:text-5xl text-3xl font-bold">Purchase</h1>
        </div>
        <div className="card shrink-0 w-full md:min-w-[600px] min-w-[400px] hover:shadow-2xl bg-base-100 pb-6 border-2">
          <form onSubmit={handlePurchase} className="card-body pb-0">
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
                min={0}
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

            <div className="flex flex-col gap-2 ">
              <label className="label lg:text-xl text-lg font-bold">
                <span className="label-text lg:text-lg">Buying Date</span>
              </label>

              <DatePicker
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border-2  focus:ring lg:p-4 p-2 rounded-lg w-full lg:text-lg"
              />
            </div>

            <div className="form-control mt-6">
              <button
                disabled={!quantity}
                className="btn btn-primary font-bold lg:text-lg"
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
