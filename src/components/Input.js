import React from "react";

function Input({ onChange, type, placeholder, width }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={` ${
        width ? "w-[100%]" : "w-[100%]"
      } px-6 py-2  border focus:outline-none focus:border-gray-400 focus:shadow-sm`}
    />
  );
}

export default Input;
