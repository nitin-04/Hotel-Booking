import React from "react";
import Title from "./Title";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py16 lg:mx-auto my-30 bg-gray-200 shadow-lg">
      <Title
        title="Never Miss a Deal"
        subTitle="Subscribe to get the latest offers, new arrivals, and exclusive
        discounts"
      />
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 mt-10">
        <input
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
