import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
const Register = () => {
  const { createUser, setUser, logOut, setLoading, user } =
    useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, photo } = data;

    setRegisterError("");

    if (password.length < 6) {
      setRegisterError("password must be 6 characters or more!");
      return;
    } else if (!/^(?=.*[A-Z]).+$/.test(password)) {
      setRegisterError("password should have at least one upper case letter");
      return;
    } else if (!/^(?=.*[a-z]).+$/.test(password)) {
      setRegisterError("password should have at least one lower case letter");
      return;
    }

    createUser(email, password)
      .then(async (result) => {
        try {
          // Update user profile to show name and photo
          await updateProfile(result.user, {
            displayName: name,
            photoURL: photo,
          });

          // Send user data to the database
          await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              userEmail: result.user?.email,
              userName: result.user?.displayName,
              photo: result.user?.photoURL,
            }),
          });

          logOut();

          toast.success("User created successfully!!");
          reset();
          navigate("/login");
          window.location.reload();
        } catch (error) {
          console.log(error);
          toast.error(error.message.slice(10));
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.message.slice(10));
        setLoading(false);
      });
  };

  return (
    <div className="hero   ">
      <Helmet>
        <title>Best Taste|Register</title>
      </Helmet>
      <div className="hero-content flex-col animate__animated animate__pulse">
        <div className="text-center ">
          <h1 className="lg:text-5xl md:text-4xl text-3xl text-[#8A2BE2] font-bold text-center">
            Register now!
          </h1>
        </div>
        <div className="card  shrink-0 w-full md:min-w-[600px] min-w-[400px] hover:shadow-2xl  pb-6 bg-gradient-to-r from-[#8A2BE24D] from-0% via-[#8A2BE219] via-50% to-[#8A2BE20D] to-100% border-gradient text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white lg:text-lg">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered text-black"
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white lg:text-lg">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered text-black"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text  text-white lg:text-lg">
                  Photo-URL
                </span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="Photo-URL"
                className="input input-bordered text-black"
                {...register("photo")}
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text  text-white lg:text-lg">
                  Password
                </span>
              </label>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered text-black"
                {...register("password", { required: true })}
              />
              <div
                className="absolute lg:left-[500px] lg:top-[60px] md:left-[500px] text-black left-[300px] top-[53px]"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
              <p className="text-red-500">
                {errors.password ? "" : registerError}
              </p>
              <label className="label">
                <a
                  href="#"
                  className="label-text- text-white alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-boold lg:text-lg">
                Register
              </button>
            </div>

            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 font-bold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
