import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyFood from "./MyFood";
import { Link } from "react-router-dom";

const MyFoods = () => {
  const [myFoods, setMyFoods] = useState([]);
  // const [myFoods, setmyFoods] = useState([]);

  const { user } = useContext(AuthContext);
  //   console.log(user);

  // fetch(`https://assignment-10-server-eight-opal.vercel.app/craft/?${queryParams}`)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myAdded/${user?.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyFoods(data);
        // console.log(data);
      });
  }, [user?.email]);

  //   useEffect(() => {
  //     setmyFoods(myFoods);
  //   }, [myFoods]);

  //   const handleYes = () => {
  //     const filtered = myFoods.filter((myFood) => myFood.customization == "yes");
  //     setmyFoods(filtered);
  //   };
  //   const handleNo = () => {
  //     const filtered = myFoods.filter((myFood) => myFood.customization == "no");
  //     setmyFoods(filtered);
  //   };

  return (
    <div>
      <Helmet>
        <title>My Foods</title>
      </Helmet>
      <div className="flex">
        <h3 className="lg:text-5xl md:text-4xl text-3xl text-purple-950 font-bold text-center flex-1">
          My Added Food Items{" "}
        </h3>
        {/* <details className="dropdown dropdown-bottom dropdown-end  ms-auto">
          <summary className="m-1 btn lg:btn-md btn-sm btn-primary lg:text-lg font-bold">
            Customization
          </summary>
          <ul className="md:p-2 p-1 shadow menu dropdown-content bg-green-700  z-[100]  rounded-box lg:w-40 md:w-32 w-20">
            <li onClick={handleYes} className="font-bold text-lg  border-b-2">
              <a>yes</a>
            </li>
            <li onClick={handleNo} className="font-bold text-lg">
              <a>no</a>
            </li>
          </ul>
        </details> */}
      </div>
      <div className="divider bg-[#511b4b] lg:h-1 h-[2px]"></div>
      <div
        className={`${
          myFoods.length === 0
            ? "flex flex-col justify-center items-center"
            : "grid lg:grid-cols-3  grid-cols-1 gap-4 my-10"
        }`}
      >
        {myFoods.length === 0 && (
          <div className="flex flex-col items-center gap-6 bg-red-200 p-2 border-2 border-red-900 rounded-2xl">
            <p className=" font-bold text-lg text-red-500">
              Oppps!! No items are added by you.
            </p>
            <Link to="/add-food">
              <button className="btn btn-primary font-bold border-red-900 bg-red-700 hover:bg-red-800 hover:text-white">
                Add Items
              </button>
            </Link>
          </div>
        )}
        {myFoods.map((myFood) => (
          <MyFood
            key={myFood._id}
            myFood={myFood}
            myFoods={myFoods}
            setMyFoods={setMyFoods}
          ></MyFood>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
