import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// import "animate.css";
const NotFound = () => {
  return (
    <section className="flex items-center h-full p-16  ">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-green-500 ">
            <span className="sr-only animate__animated animate__bounce">
              Error
            </span>
            404!
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we could not find this page.
          </p>
          <p className="mt-4 mb-8 ">
            But do not worry, you can find plenty of other things on our
            homepage.
          </p>
          <Link
            to="/"
            className="bg-green-500 px-5 py-2 rounded-xl text-white font-semibold text-lg hover:bg-opacity-85"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
