import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(async (result) => {
        toast.success("Logged Out successfully!");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          user,
          {
            withCredentials: true,
          }
        );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink className="text-[#8A2BE2]" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[#8A2BE2]" to="/allFoods">
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink className="text-[#8A2BE2]" to="/gallery">
          Gallery
        </NavLink>
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
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow font-semibold bg-purple-300 text-white rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost lg:text-4xl font-Permanent text-[#8A2BE2] md:text-3xl font-bold text-2xl"
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
                    <li className="font-bold p-2 text-white">
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
                className="btn  font-bold lg:text-lg bg-[#7D3C98] text-white hover:bg-purple-900 "
              >
                Log Out
              </button>
            </div>
          ) : loading ? (
            <div className="text-center mr-10">
              {" "}
              <span className="loading loading-spinner loading-md text-white "></span>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button className="btn  font-bold lg:text-lg bg-[#7D3C98] text-white hover:bg-purple-900 ">
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
