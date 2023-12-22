import React, { useEffect, useState } from "react";
import bgimg from "../assets/Untitled design (2).png";
import { Link } from "react-router-dom";
import config from "../Config";

function ProductGrid({ id }) {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.appUrl}/api/category/menu/${id}/`);
      const data = await response.json();
      if(response.status == 200){

        console.log(response);
        setMenu(data);
      }else{
        setMenu([])
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      {menu.length == 0 && !loading ? (
        <div className="">
          <span className="text-red-600 md:text-2xl">
            {" "}
            There no Menu  found in this category{" "}
          </span>
        </div>
      ) : (
        <div></div>
      )}
      <div
        className={` ${
          loading ? "opacity-70" : ""
        } relative  grid max-w-6xl w-full md:w-[80%] lg:max-w-6xl grid-cols-2 sm:grid-cols-2 p-4 gap-y-10 lg:grid-cols-4 mx-auto gap-x-4`}
      >
        {loading && (
          <div className="absolute flex items-center justify-center w-full">
            <i className="text-green-600 fa fa-2x fa-spinner fa-spin"></i>
          </div>
        )}
        {menu.length > 0 &&
          menu.map((item, index) => (
            <div
              key={index}
              className="flex flex-col w-full bg-white shadow-2xl"
            >
              <img className="h-40 lg:h-60 " src={item.imgUrl} />
              <div className="flex flex-col items-center py-6 lg:px-4">
                <span className="w-full text-sm md:text-lg"> {item.title} </span>
                <Link to={`/menu/${item.id}/${item.title}`}>
                  <button className="px-6 py-4 mt-6 text-sm font-semibold text-white rounded-full lg:mt-10 bg-primary w-fit">
                    See Menu{" "}
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>{" "}
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ProductGrid;
