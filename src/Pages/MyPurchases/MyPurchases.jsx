import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyPurchase from "./MyPurchase";

const MyPurchases = () => {
  const [myPurchases, setMyPurchases] = useState([]);
  //   const [myPurchases, setmyPurchases] = useState([]);

  const { user } = useContext(AuthContext);
  // console.log(user.email);

  // fetch(`https://assignment-10-server-eight-opal.vercel.app/craft/?${queryParams}`)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/purchase/${user?.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyPurchases(data);
        // console.log(data);
      });
  }, [user?.email]);

  return (
    <div>
      <Helmet>
        <title>My Purchases</title>
      </Helmet>
      <div className="flex">
        <h3 className="lg:text-4xl md:text-3xl text-xl font-bold md:text-center text-left flex-1">
          My Purchased Food Items{" "}
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
      <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 my-10">
        {myPurchases.map((myPurchase) => (
          <MyPurchase
            key={myPurchase._id}
            myPurchase={myPurchase}
            myPurchases={myPurchases}
            setMyPurchases={setMyPurchases}
          ></MyPurchase>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
