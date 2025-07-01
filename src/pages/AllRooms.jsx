import React from "react";

const AllRooms = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between  px-4 pt-28 md:pt-35 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-serif text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base mt-3 text-gray-300 max-w-174">
            Explore our range of luxurious hotel rooms designed for your comfort
            and relaxation.
          </p>
        </div>
      </div>
      <div></div>
      <h1>AllRooms</h1>
    </div>
  );
};

export default AllRooms;
