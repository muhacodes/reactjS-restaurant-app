import React from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link, useLocation } from "react-router-dom";

function Home() {
  return (
    <>
      <Navigation />

      <Top_Banner />

      <FeaturedProducts />


      
      
    </>
  );
}

export default Home;
