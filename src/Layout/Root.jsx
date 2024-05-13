import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const Root = () => {
  return (
    <div className="font-poppins">
      <Navbar></Navbar>
      <div className=" min-h-[calc(100vh-397px)] max-w-7xl mx-auto px-4 lg:my-10 md:my-6 my-3">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
