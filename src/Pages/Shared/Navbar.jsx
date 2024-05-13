import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
// import logo from "../../assets/images/logopng.png";

// import { Tooltip } from "react-tooltip";
const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  console.log(user);
  // const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   const localTheme = localStorage.getItem("theme");
  //   document.querySelector("html").setAttribute("data-theme", localTheme);
  // }, [theme]);

  // const handleToggle = (e) => {
  //   if (e.target.checked) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  // console.log(user.photoURL);
  const handleLogOut = () => {
    logOut()
      .then(async (result) => {
        toast.success("Logged Out successfully!");
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        });
        console.log(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allFoods">All Foods</NavLink>
      </li>
      <li>
        <NavLink to="/gallery">Gallery</NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div className="navbar  mx-auto px-4  ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost lg:text-4xl font-Permanent text-purple-950 md:text-3xl font-bold text-2xl"
          >
            Best Taste
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-lg">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end items-center gap-2">
          {/* <label className="cursor-pointer grid place-items-center">
            <input
              onChange={handleToggle}
              type="checkbox"
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
              data-tooltip-delay-hide={1000}
            />
            <Tooltip anchorSelect=".theme-controller" place="bottom">
              {`Current theme is ${theme}`}
            </Tooltip>
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label> */}
          {user ? (
            <div className="flex items-center ">
              <div className="dropdown  dropdown-bottom dropdown-end bg-inherit hover:bg-inherit border-0">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-inherit hover:bg-inherit border-0  m-1"
                >
                  <img
                    alt="User"
                    className=" rounded-full w-10"
                    src={user.proactiveRefresh.user?.photoURL}
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content  z-[1000] menu p-2 pb-0  bg-purple-800 border-2  rounded-box w-52"
                >
                  <Link to="/addedFoods" className="border-b-2">
                    <li className="font-bold p-2  text-white ">
                      {" "}
                      My added food items
                    </li>
                  </Link>
                  <Link to="/add-food" className="border-b-2">
                    <li className="font-bold p-2  text-white ">
                      Add a food item
                    </li>
                  </Link>
                  <Link to="/purchasedFoods" className="border-b-2">
                    <li className="font-bold  p-2 text-white ">
                      My ordered food items
                    </li>
                  </Link>
                </ul>
              </div>
              <button
                onClick={handleLogOut}
                className="btn font-bold lg:text-lg bg-[#7D3C98] text-white "
              >
                Log Out
              </button>

              {/* <div className="w-10  ">
                <img
                  alt="User"
                  className="userPhoto rounded-full"
                  src={user.photoURL}
                />
              </div>
              <Tooltip anchorSelect=".userPhoto" place="bottom">
                {user.displayName}
              </Tooltip>

              <button
                onClick={handleLogOut}
                className="btn font-bold btn-primary lg:text-lg"
              >
                Log Out
              </button> */}
            </div>
          ) : loading ? (
            <div className="text-center mr-10">
              {" "}
              <span className="loading loading-spinner loading-md "></span>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button className="btn font-bold btn-primary lg:text-lg ">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
