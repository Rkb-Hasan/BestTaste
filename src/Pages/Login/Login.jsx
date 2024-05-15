import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "animate.css";
import axios from "axios";

const Login = () => {
  const { logIn, googleSignIn, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (userData) => {
    const { email, password } = userData;

    try {
      //User Login
      const result = await logIn(email, password);
      console.log(result.user);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);

      toast.success("Signin Successful");
      navigate(location?.state ? location.state : "/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
      setLoading(false);
    }
    reset();
  };
  // google sign-in
  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: result?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      toast.success("Signin Successful");
      navigate(location?.state ? location.state : "/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="hero animate__animated animate__pulse">
      <Helmet>
        <title>Best Taste|Login</title>
      </Helmet>

      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
            Login now!
          </h1>
        </div>
        <div className="card shrink-0 w-full md:min-w-[600px] min-w-[400px]  hover:shadow-2xl  bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white  lg:text-lg">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered text-black"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required!</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white  lg:text-lg">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered text-black"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500">This field is required!</span>
              )}
              <label className="label">
                <a href="#" className="label-text text-white  link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-bold lg:text-lg">
                Login
              </button>
            </div>

            <div>
              <p>
                Do not have an account?{" "}
                <Link to="/register" className="text-red-500 font-bold">
                  Register
                </Link>
              </p>
            </div>
          </form>

          <div className="flex justify-center items-center gap-1 px-6 pt-2">
            <div className="h-[2px]  bg-slate-300 flex-grow"></div>
            <div className="font-bold">OR</div>
            <div className="h-[2px]   bg-slate-300 flex-grow"></div>
          </div>

          <div className="flex gap-6 items-center justify-center p-6">
            <div>
              {/* <button
                onClick={handleGithub}
                className="flex items-center gap-1 btn btn-outline text-lg font-semibold"
              >
                {" "}
                <FaGithub /> <span className="font-bold">Github</span>
              </button> */}
            </div>
            <div>
              <button
                onClick={handleGoogle}
                className="flex items-center gap-1 btn btn-outline text-lg "
              >
                {" "}
                <FcGoogle />{" "}
                <span className="font-bold text-white">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
