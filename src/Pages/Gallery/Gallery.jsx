import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider/AuthProvider";

const Gallery = () => {
  const { loading, user } = useContext(AuthContext);
  const [galleryDocs, setGalleryDocs] = useState([]);

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

  return (
    <div>
      <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
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
              <div className="bg-slate-700 opacity-0 group-hover:opacity-95 w-full p-4 h-full flex flex-col justify-center items-center ">
                <div>
                  <div className="bg-slate-950 p-4 border-2 border-slate-300 rounded-2xl">
                    <h3 className="font-bold text-white text-xl text-left">
                      {galleryDoc.name}
                    </h3>
                    <div className="divider my-1 h-[1.5px] bg-white"></div>
                    <h3 className="font-semibold text-gray-400  text-left">
                      {galleryDoc.feedback}
                    </h3>
                    <button className="btn mt-4  btn-primary  font-bold">
                      Add
                    </button>
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
