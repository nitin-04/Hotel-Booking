import { roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import { assets, facilityIcons } from "../assets/assets";
import { useState } from "react";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={(e) => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, SetOpenFilters] = useState(false);
  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest first",
  ];
  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between  px-4 pt-28 md:pt-35 md:px-16 lg:px-24 xl:px-32">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-serif text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base mt-3 text-gray-500 max-w-174">
            Explore our range of luxurious hotel rooms designed for your comfort
            and relaxation.
          </p>
        </div>
        {roomsDummyData.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row items-start py-12 gap-6 border-b border-gray-200 last:pb-32
            last:border-0"
          >
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-rooms"
              title="View Room Details"
              className="max-h-64 md:w-1/2 rounded-2xl shadow-lg object-cover cursor-pointer "
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-800 text-3xl font-serif cursor-pointer"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center">
                <StarRating />
                <p className="ml-2">200+ reviews</p>
              </div>
              <div className="flex items-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 px-3 py-2 rounded-lg bg-[#F5F5F5] items-center "
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-6 h-6"
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xl font-medium">
                ${room.pricePerNight}/night
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white w-80 border-2 border-gray-400 rounded-2xl text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilters && "border-b"
          }`}
        >
          <p className="text-base font-medium to-gray-700">Filters</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => SetOpenFilters(!openFilters)}
              className="lg:hidden"
            >
              {openFilters ? "Close" : "Open"}
            </span>
            <span className="hidden lg:block">Clear</span>
          </div>
        </div>
        <div
          className={`transition-all duration-500 ${
            openFilters
              ? "h-auto opacity-100 pointer-events-auto"
              : "h-0 opacity-0 pointer-events-none"
          } lg:h-auto lg:opacity-100 lg:pointer-events-auto overflow-hidden`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox key={index} label={room} />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox key={index} label={`$ ${range}`} />
            ))}
          </div>
          <div className="px-5 py-5 ">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton key={index} label={option} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
