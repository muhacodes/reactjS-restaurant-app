import React, { useEffect, useState } from "react";
import Top_Banner from "../components/Top_Banner";
import Navigation from "../components/Navigation";
import DashboardUI from '../components/Dashboard/Dashboard';

function Dashboard() {
  return (
    <>
    <Navigation />

    
    <Top_Banner title="Dashboard" />

    <DashboardUI />

    
    </>
  )
}

export default Dashboard