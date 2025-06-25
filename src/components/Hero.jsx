import React from "react";
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("https://img.freepik.com/photos-premium/lobby-flou-abstrait-dans-hotel-ia-generative_874904-108476.jpg?semt=ais_hybrid&w=740")] bg-cover bg-no-repeat bg-c h-screen bg-black/40 bg-blend-darken'>
      <p className="bg-fuchsia-600 px-3.5 py-1 rounded-full mt-20 text-sm md:text-base font-medium tracking-wide shadow-md">
        Elevate Your Stay with Unmatched Comfort & Style
      </p>
      <h1 className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 max-w-xl leading-tight">
        Your Next Escape Starts Here — Find the Stay That Feels Like Home
      </h1>

      <p className="text-lg max-w-130 md:text-xl lg:text-2xl xl:text-3xl mt-4">
        Find the perfect place to unwind, recharge, and make memories that last.
      </p>

      <form
        className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-6  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto transition-all duration-300 hover:text-black
 "
      >
        <div>
          <div className="flex items-center gap-2 ">
            <img src={assets.calenderIcon} alt="calender" className="h-4" />
            <label htmlFor="destinationInput" className="text-sm font-medium">
              Destination
            </label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calender" className="h-4" />
            <label htmlFor="checkIn" className="text-sm font-medium">
              Check in
            </label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src={assets.calenderIcon} alt="calender" className="h-4" />
            <label htmlFor="checkOut" className="text-sm font-medium">
              Check out
            </label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests" className="text-sm font-medium">
            Guests
          </label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img src={assets.searchIcon} alt="searchIcon" className="h-7" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Hero;
