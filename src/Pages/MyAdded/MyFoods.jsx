import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyFood from "./MyFood";
import { Link } from "react-router-dom";

const MyFoods = () => {
  const [myFoods, setMyFoods] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [errState, setErrState] = useState(false);

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myAdded/${user?.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setErrState(true);
          setErrMessage("No Items are added by you!!");
        } else {
          setMyFoods(data);
          console.log(data);
        }
      });
  }, [user?.email]);

  return (
    <div>
      <Helmet>
        <title>Best Taste|Added Foods</title>
      </Helmet>
      <div className="flex">
        <h3 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center flex-1">
          My Added Food Items{" "}
        </h3>
      </div>
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      {errState ? (
        <p className="text-red-500 font-bold text-center flex flex-col items-center gap-4 w-full">
          <span> {errMessage}</span>{" "}
          <Link to="/add-food">
            <span className="bg-purple-900 p-2 rounded-lg text-white font-bold">
              Add Items
            </span>
          </Link>
        </p>
      ) : loading ? (
        <div className="text-center mr-10">
          {" "}
          <span className="loading loading-spinner loading-md text-white"></span>
        </div>
      ) : (
        <div
          className={`grid lg:grid-cols-3  grid-cols-1 gap-4 p-4 rounded-2xl my-10 ${
            myFoods.length &&
            "bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right"
          }`}
        >
          {myFoods.map((myFood) => (
            <MyFood
              key={myFood._id}
              myFood={myFood}
              myFoods={myFoods}
              setMyFoods={setMyFoods}
            ></MyFood>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
