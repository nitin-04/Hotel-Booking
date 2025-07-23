import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, [nextUrl]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-900 border-t-violet-500"></div>
    </div>
  );
};

export default Loader;
