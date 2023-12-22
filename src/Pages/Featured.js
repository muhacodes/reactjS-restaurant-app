import React, { useEffect, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import FeaturedProducts from "../components/FeaturedProducts";
import Modal from "../components/ProductItemModal";
import config from "../Config";

function Featured() {
  const [menu, SetMenu] = useState([]);
  const [product, SetProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addCartModal = (item) => {
    SetProduct(item);
    setIsModalOpen(!isModalOpen);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.appUrl}/api/menu-item`);
      const data = await response.json();
      const featuredMenu = data.filter((item) => item.featured === true);

      SetMenu(featuredMenu);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setLoading(false);
    }
  };

  function truncateDescription(description, wordLimit) {
    const words = description?.split(" ");

    if (words?.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }

    return description;
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navigation />

      <Top_Banner title="Featured Products" />

      <div className="flex flex-col items-center gap-10 py-20 mx-auto text-center shadow-sm max-w-7xl shadow-gray-100">
        <h3 className="font-extrabold text-gray-600 capitalize lg:text-2xl">
          Featured Products
        </h3>

        {menu.length == 0 ? (
          <div className="">
            <span className="text-red-600 md:text-2xl">
              {" "}
              There no Menu Items found in this category{" "}
            </span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="grid w-full grid-cols-2 px-2 mx-auto gap-y-10 gap-x-4 sm:gap-x-10 lg:w-full md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {menu.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-start shadow-2xl lg:shadow-lg hover:shadow-2xl text-start"
            >
              <img
                className="h-[180px] md:h-[250px] w-full"
                src={item.image_url}
              />
              <div className="flex flex-col px-2 py-4 lg:px-6 lg:py-10">
                <span className="font-medium"> {item.title} </span>
                <p className="my-2 text-sm text-gray-500">
                  {truncateDescription(item.description, 10)}
                </p>
                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={() => {
                      addCartModal(item);
                    }}
                    className="px-4 py-2 text-sm border hover:bg-primary hover:text-white lg:px-7"
                  >
                    {" "}
                    Add to Cart{" "}
                  </button>
                  <span className="text-primary"> {item.price} </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal productItem={product} isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}

export default Featured;
