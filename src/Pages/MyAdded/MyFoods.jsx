import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyFood from "./MyFood";

const MyFoods = () => {
  const [myFoods, setMyFoods] = useState([]);
  //   const [myFoods, setmyFoods] = useState([]);

  const { user } = useContext(AuthContext);
  //   console.log(user);

  // fetch(`https://assignment-10-server-eight-opal.vercel.app/craft/?${queryParams}`)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/myAdded/${user?.email}`)
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
        <h3 className="lg:text-4xl md:text-3xl text-xl font-bold md:text-center text-left flex-1">
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
      <div className="divider"></div>
      <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 my-10">
        {myFoods.map((myFood) => (
          <MyFood key={myFood._id} myFood={myFood}></MyFood>
        ))}
      </div>
    </div>
  );
};

export default MyFoods;
