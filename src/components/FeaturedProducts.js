import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import config from "../Config";

function FeaturedProducts() {
  const [menu, setMenu] = useState([]);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(`${config.appUrl}/api/category`); // Replace with your API endpoint
      const data = await response.json();
      setMenu(data);
      setCurrentSelectedIndex(data[0].id)
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const changeSelectedIndex = (index) => {
    setCurrentSelectedIndex(index);
    console.log(index);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 mx-auto item max-w-7xl">
        <h3 className="font-extrabold text-gray-800 lg:text-6xl">
          {" "}
          DELICIOUS MENU{" "}
        </h3>
        <ul
          style={{ direction: "rtl" }}
          className="flex w-full gap-4 py-4 my-10 overflow-x-auto list-disc border border-l-0 border-r-0 border-gray-400 shadow-sm md:w-auto shadow-gray-100 px-14 "
        >
          {menu.map((item, index) => (
            <li key={index}
              onClick={() => {
                changeSelectedIndex(item.id);
              }}
              className={`mx-4 cursor-pointer ${
                currentSelectedIndex == item.id ? "text-primary" : ""
              } `}
            >
              {" "}
              {item.title}{" "}
            </li>
          ))}{" "}
        </ul>
      </div>

      <ProductGrid id={currentSelectedIndex} />
    </>
  );
}

export default FeaturedProducts;
