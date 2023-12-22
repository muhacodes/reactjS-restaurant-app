{productItem.choices.map((choice) => (
    <div className="flex flex-col items-start gap-2 mb-4 text-start">
      <span className="text-gray-500"> {choice.name} </span>
      <select
        onChange={(e) => updateChoices(choice.name, e.target.value)}
        defaultValue=""
        className="w-full p-2 text-sm border"
      >
        <option onChange={updateChoices}> Select </option>
        {choice.options.map((option) => (
          <option className="text-sm text-gray-800">
            {" "}
            {option.option}{" "}
          </option>
        ))}
      </select>
    </div>
  ))}

  import React, { createContext, useEffect, useState } from "react";
// import cloneDeep from lodash/cloneDeep;

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [Auth, setAuth] = useState({});

  const [dummy, setDummy] = useState();

  useEffect(() => {
    getAuthFromLocalStorage();
  },);




  const getAuthFromLocalStorage = () => {
    setDummy("john");
    const authStr = localStorage.getItem("auth");
    if (authStr) {
      const auth = JSON.parse(authStr);
      // person = 'henry';
      // setAuth(auth);
      // console.log(auth);
      // if (auth.expires) {
      //   const expiryDate = new Date(auth.expires);

      //   if (expiryDate > new Date()) {
      //     setAuth(auth);
          
      //     // console.log(auth);
      //   } else {
      //     localStorage.removeItem("auth");
      //   }
      // } else {
      //   localStorage.removeItem("auth");
      // }
    }

    console.log(dummy)
    

  };






  const isFirstLogin = () => {
    return Object.keys(Auth).length === 0;
  };

  const saveAuthToLocalStorage = () => {
    const authStr = JSON.stringify(Auth);
    localStorage.setItem("auth", authStr);
  };
  // Function to update the authorization state
  const updateAuth = (newAuth) => {
    const auth = JSON.stringify(newAuth);
    setAuth(auth);
    localStorage.setItem("auth", auth);
    localStorage.setItem("x-auth", auth);
  };

  const TryAutoLogin = () => {};

  return (
    <AuthContext.Provider
      value={{
        Auth,
        updateAuth,
        isFirstLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
