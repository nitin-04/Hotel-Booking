import React from "react";
import Testimonial from "./Testimonial";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="star_icon"
            className="w-4 h-4"
          />
        ))}
    </>
  );
};

export default StarRating;
