import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedDestination = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center px-6 py-20 md:px-16 lg:px-24 bg-slate-50">
      <Title
        title="Featured Destinations"
        subTitle="Discover breathtaking places handpicked to inspire your next unforgettable escape."
      />

      <div className="flex flex-wrap items-center justify-center gap-4 mt-20">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button
        className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
        onClick={() => {
          navigate("/rooms");
          scrollTo(0, 0);
        }}
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDestination;
