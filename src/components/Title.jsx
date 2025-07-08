import React from "react";

const Title = ({ title, subTitle, align, font, children }) => {
  return (
    <div
      className={`flex flex-col justify-center text-center ${
        align === "left" && "md:items-start md: text-left"
      } `}
    >
      <h1 className={`text-4xl md:text-[40px] ${font || "font-serif "}`}>
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-500 mt-2 max-w-174">
        {subTitle}
      </p>
      {children && <div className="mt-6 w-full">{children}</div>}
    </div>
  );
};

export default Title;
