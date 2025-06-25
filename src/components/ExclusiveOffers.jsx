import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div>
      <div>
        <Title
          align="left"
          title="Exclusive Offers"
          subTitle="Take advantage our Limited time offers and special packages to enhance your stay and create unforgattable memory"
        />
        <button>
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>
    </div>
  );
};

export default ExclusiveOffers;
