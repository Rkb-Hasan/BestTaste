import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgImg from "../../assets/images/gallerybg.jpg";
const Gallery = () => {
  const { loading, user } = useContext(AuthContext);
  const [galleryDocs, setGalleryDocs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    getData();
  }, []);
  // console.log(topFoods);

  const getData = async () => {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/gallery`);
    setGalleryDocs(data);
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        {" "}
        <span className="loading loading-spinner loading-lg "></span>
      </div>
    );

  const handleGallery = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const feedback = form.feedback.value;
    const image_url = form.image_url.value;

    const galleryDoc = {
      name,
      feedback,
      image_url,
    };
    console.log(galleryDoc);
    // send to server
    fetch(`${import.meta.env.VITE_API_URL}/galleryDoc`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(galleryDoc),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log(data);
          Swal.fire({
            title: "Success!",
            text: "Gallery Doc added",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/");
        }
      });
  };

  return (
    <div>
      <div
        className="w-full mb-10 bg-center bg-cover h-[25rem]   rounded-2xl"
        style={{
          background: `url(${bgImg}),linear-gradient(180deg, rgba(19, 19, 24, 0.9) 0%, rgba(19, 19, 24, 0.7) 100%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="flex flex-col justify-center items-center w-full h-full bg-gray-900/70 text-5xl font-extrabold text-white rounded-2xl text-opacity-85">
          GALLERY
        </h3>
      </div>
      {/* className=" " */}
      <section className="py-6 dark:bg-gray-100 dark:text-gray-900 rounded-2xl border-4">
        <div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
          {/* <img
            src="https://source.unsplash.com/random/301x301/"
            alt=""
            className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
          /> */}
          {galleryDocs.map((galleryDoc, idx) => (
            <div
              key={galleryDoc._id}
              className={`group  ${
                idx == 0
                  ? "w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
                  : idx == 9
                  ? "w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square"
                  : "w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
              }`}
              style={{
                backgroundImage: `url(${galleryDoc.image_url})`,
                backgroundSize: "cover",
                backgroundRepeat: "none",
                backgroundPosition: "center",
              }}
            >
              {/* <figure>
                <img alt="" src={} />
              </figure> */}
              <div className="bg-slate-700 opacity-0 group-hover:opacity-95 duration-500 w-full p-4 h-full flex flex-col justify-center items-center ">
                <div>
                  <div className="bg-slate-950 p-4 border-2 border-slate-300 rounded-2xl">
                    <h3 className="font-bold text-white text-xl text-left">
                      {galleryDoc.name}
                    </h3>
                    <div className="divider my-1 h-[1.5px] bg-white"></div>
                    <h3 className="font-semibold text-gray-400  text-left">
                      {galleryDoc.feedback}
                    </h3>
                    <Link
                      to={{
                        pathname: user ? "" : "/login",
                      }}
                      state={location.pathname}
                    >
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                        className="btn mt-4  btn-primary  font-bold"
                      >
                        Add
                      </button>
                    </Link>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <form onSubmit={handleGallery}>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text lg:text-lg">
                                Name
                              </span>
                            </label>
                            <input
                              type="text"
                              name="userName"
                              value={user?.displayName}
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text lg:text-lg">
                                Image URL
                              </span>
                            </label>
                            <input
                              type="text"
                              name="image_url"
                              placeholder="Image URL..."
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text lg:text-lg">
                                feedback
                              </span>
                            </label>
                            <input
                              type="text"
                              name="feedback"
                              placeholder="feedback..."
                              className="input input-bordered"
                            />
                          </div>
                          <div className="form-control mt-6">
                            <button className="btn btn-primary font-bold lg:text-lg">
                              Add
                            </button>
                          </div>
                        </form>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-primary lg:text-lg">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
