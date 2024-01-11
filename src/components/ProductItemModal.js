import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { CartContext } from "../context/CartContext";
import { CartActions } from "../store/cart/cart";
const Modal = ({ isOpen, onClose, productItem }) => {
  const dispatch = useDispatch();
  const { addItemToCart } = useContext(CartContext);
  const [selections, setSelections] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateChoices = (choiceName, selectedOption, optionPrice) => {
    // console.log(selectedOption);
    // Create an object for the new choice
    const newChoice = {
      choice: choiceName,
      option: selectedOption,
      price: optionPrice ? parseFloat(optionPrice) : 0,
    };

    const existingChoiceIndex = selections.findIndex(
      (choice) => choice.choice === choiceName
    );

    if (existingChoiceIndex !== -1) {
      if (selectedOption == "Select") {
        const filteredSelections = selections.filter(
          (select) => select.choice !== choiceName
        );
        setSelections((prevSelections) => {
          const updatedSelections = [...filteredSelections];
          calculateTotalPrice(updatedSelections); // Update total price whenever selections change
          return updatedSelections;
        });
        
      } else {
        setSelections((prevSelections) => {
          const updatedSelections = [...prevSelections];
          updatedSelections[existingChoiceIndex] = newChoice;
          calculateTotalPrice(updatedSelections); // Update total price whenever selections change
          return updatedSelections;
        });
      }
    } else {
      setSelections((prevSelections) => {
        const updatedSelections = [...prevSelections, newChoice];
        calculateTotalPrice(updatedSelections); // Update total price whenever selections change
        return updatedSelections;
      });
    }
  };

  const calculateTotalPrice = (selections) => {
    const total = selections.reduce((sum, choice) => sum + choice.price, 0);
    setTotalPrice(total);
  };

  const addToCart = (e) => {
    e.preventDefault();

    // The choices array contains all the various choices each menu item has, like choice of juice, or eggs
    
    const choices = productItem.choices.map((choice) => choice.name);

    // selectedchoices contains the choice names the user selected
    
    let selectedChoices = selections.map((select, index) => select.choice);
    // const checkSelections2 = selections.map((select, index) => options[index]);

    //  this checks if the user selected all the options, 
    const check = choices.every((item) => selectedChoices.includes(item));

    console.log(selections);
    // console.log(options);
    if (!check) {
      alert("Please choose all options!");
      selectedChoices = null;
      return;
    }else{

      const _item = {
        id: uuidv4(),
        productItem,
        selectedChoices: selections,
        subtotal: productItem.price + totalPrice,
        quantity: 1,
      };
      
      // addItemToCart(_item);
      dispatch(CartActions.addItemToCart(_item));
      alert('Item added to cart succesfuly');
      onClose();
      
    }
  
   
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        {/* Modal content */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block p-5 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex flex-col">
            <form onSubmit={addToCart}>
              <div className="w-[100%] p-4 h-[350px] mx-auto">
                <img
                  className="h-[100%] w-[100%]"
                  src={productItem.image_url}
                />
              </div>
              <span className="w-full p-2 mb-4 text-2xl font-bold">
                {" "}
                {productItem.title}{" "}
              </span>

              {productItem.choices.map((choice) => (
                <div
                  key={choice.id}
                  className="flex flex-col items-start gap-2 mb-4 text-start"
                >
                  <span className="text-gray-500"> {choice.name} </span>
                  <select
                    required
                    onChange={(e) => {
                      const selectedOption =
                        e.target.options[e.target.selectedIndex];
                      updateChoices(
                        choice.name,
                        selectedOption.text,
                        selectedOption.getAttribute("data-price")
                      );
                    }}
                    defaultValue=""
                    className="w-full p-2 text-sm border appearance-none"
                  >
                    <option onChange={updateChoices}> Select </option>
                    {choice.options.map((option) => (
                      <option
                        key={option.id}
                        data-price={option.amount}
                        className="text-sm text-gray-800"
                      >
                        {" "}
                        {option.option}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <div className="px-4 py-3 mt-auto bg-gray-50 sm:px-6 sm:flex">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-800 border border-gray-300 rounded-md shadow-sm bg-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </form>
          </div>

          <button
            onClick={onClose}
            className="absolute top-0 right-0 z-50 w-10 h-10 border rounded-full bg-primary"
          >
            {" "}
            <i class="fa fa-times text-white" aria-hidden="true"></i>{" "}
          </button>
        </div>
        {/* <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title"> {productItem.title} </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Your modal content goes here.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={onClose} className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
