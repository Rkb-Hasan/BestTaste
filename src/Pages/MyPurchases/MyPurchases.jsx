import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { Helmet } from "react-helmet-async";
import MyPurchase from "./MyPurchase";

const MyPurchases = () => {
  const [myPurchases, setMyPurchases] = useState([]);
  //   const [myPurchases, setmyPurchases] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const [errState, setErrState] = useState(false);
  const { user, loading } = useContext(AuthContext);
  // console.log(user.email);

  // fetch(`https://assignment-10-server-eight-opal.vercel.app/craft/?${queryParams}`)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/purchase/${user?.email}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setErrState(true);
          setErrMessage("No Items are purchased by you!!");
        } else {
          setMyPurchases(data);
        }
        // console.log(data);
      });
  }, [user?.email]);

  return (
    <div>
      <Helmet>
        <title>My Purchases</title>
      </Helmet>
      <div className="flex">
        <h3 className="lg:text-4xl md:text-3xl text-[#8A2BE2] text-xl font-bold md:text-center text-left flex-1">
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
      <div className="divider bg-[#8A2BE2] lg:h-1 h-[2px]"></div>

      {errState ? (
        <p className="text-red-500 font-bold text-center  w-full">
          {errMessage}
        </p>
      ) : loading ? (
        <div className="text-center mr-10">
          {" "}
          <span className="loading loading-spinner loading-md text-white"></span>
        </div>
      ) : (
        <div
          className={`grid lg:grid-cols-3 grid-cols-1 gap-4 p-4 my-10 ${
            myPurchases.length &&
            "bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient-right"
          } `}
        >
          {myPurchases.map((myPurchase) => (
            <MyPurchase
              key={myPurchase._id}
              myPurchase={myPurchase}
              myPurchases={myPurchases}
              setMyPurchases={setMyPurchases}
            ></MyPurchase>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPurchases;
