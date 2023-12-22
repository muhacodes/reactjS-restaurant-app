import React, { Context, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../ProductItemModal";

function Favorite() {
  const { Auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[product, SetProduct] = useState({});

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addCartModal = (item) => {
    SetProduct(item);
    setIsModalOpen(!isModalOpen);
  }

  function truncateDescription(description, wordLimit) {
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }

    return description;
  }
  return (
    <>
      <span className="mb-4 text-3xl font-bold "> Favorite Items </span>
      <div className="grid w-full grid-cols-1 px-4 py-10 mx-auto gap-y-10 lg:w-full md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
        {Auth.user.favorite.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-start shadow-2xl lg:shadow-lg hover:shadow-2xl text-start"
          >
            <img className="h-[250px] w-full" src={item.image_url} />
            <div className="flex flex-col px-6 py-4">
              <span className="font-medium"> {item.title} </span>
              <p className="my-2 text-sm text-gray-500">
                {truncateDescription(item.description, 10)}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => {
                    addCartModal(item);
                  }}
                  className="py-2 text-sm border hover:bg-primary hover:text-white px-7"
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

      <Modal productItem={product} isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
}

export default Favorite;
