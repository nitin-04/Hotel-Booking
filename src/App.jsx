import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import FeaturedDestination from "./components/FeaturedDestination";

const App = () => {
  const location = useLocation();
  const isOwnerPath = useLocation().pathname.includes("owner");
  console.log(location);

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<FeaturedDestination />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
