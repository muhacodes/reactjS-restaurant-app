import React from "react";

function Top_Banner({ title }) {
  const bannerTitle = title || "Menu"; // Use the title if supplied, otherwise use default text

  return (
    <div
      id="menu"
      className="flex items-start w-full text-start bg-secondary h-[200px] lg:h-[350px]"
    >
      <div className="w-[70%] h-full flex items-end mx-auto">
        <h2 className="my-10 text-2xl font-extrabold text-white lg:text-7xl">
          {bannerTitle}
        </h2>
      </div>
    </div>
  );
}

export default Top_Banner;
