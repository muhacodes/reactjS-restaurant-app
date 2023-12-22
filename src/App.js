import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";

import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import CartProvider from "./context/CartContext";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Success from "./Pages/Success";
import SignIn from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";

import Protected from "./components/Protected";

import AuthProvider from "./context/AuthContext";
import Featured from "./Pages/Featured";
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/menu/:id/:slug" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/featured" element={<Featured />} />
              <Route path="/order-success" element={<Success />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route
                path="/dashboard/*"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />

              <Route
                path="/checkout"
                element={
                  <Protected>
                    <Checkout />
                  </Protected>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
