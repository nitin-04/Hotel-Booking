import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col items-center px-6  md:px-16 lg:px-24 pt-20 pb-30">
      <div className="flex flex-col items-center md:flex-row justify-between  w-full">
        <Title
          align="left"
          title="Handpicked Deals Just for You"
          subTitle="Unlock limited-time offers and exclusive packages designed to elevate your getaway — because every stay deserves a special touch."
        />
        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12
       "
      >
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-start gap-1 group relative justify-between pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
              {item.priceOff}% OFF
            </p>
            <div>
              <p className="text-2xl font-medium font-serif">{item.title}</p>
              <p>{item.description}</p>
              <p className="text-xs text-white mt-3">
                Expires {item.expiryDate}
              </p>
            </div>
            <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
              View Offers
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="invert group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveOffers;
