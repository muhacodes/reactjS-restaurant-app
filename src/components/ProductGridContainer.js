import React, { useEffect } from "react";

function ProductGridContainer({ menu, addCartModal }) {
  function truncateDescription(description, wordLimit) {
    const words = description.split(" ");

    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }

    return description;
  }

  
  return (
    <>
    <hg2> hey </hg2>
      <div className="grid w-full grid-cols-2 px-2 mx-auto md:px-10 xl:w-full gap-y-10 gap-x-4 sm:gap-x-10 lg:w-full md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-10">
        {menu?.map((item, index) => (
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
    </>
  );
}

export default ProductGridContainer;
