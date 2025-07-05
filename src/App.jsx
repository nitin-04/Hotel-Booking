import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import FeaturedDestination from "./components/FeaturedDestination";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBooking from "./pages/MyBooking";
import HotelReg from "./components/HotelReg";

const App = () => {
  const location = useLocation();
  const isOwnerPath = useLocation().pathname.includes("owner");
  console.log(location);

  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBooking />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
