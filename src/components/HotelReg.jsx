import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import toast from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();
  const [name, SetName] = useState("");
  const [city, SetCity] = useState("");
  const [contact, SetContact] = useState("");
  const [address, SetAddress] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(
        "/api/hotel/",
        {
          name,
          city,
          contact,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="regImage"
          className=" w-1/2 rounded-xl hidden md:block"
        />
        <div className="flex flex-col items-center relative p-8 md:p-10 md:w-1/2">
          <img
            src={assets.closeIcon}
            alt="closeIcon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => {
              // console.log("close");
              setShowHotelReg(false);
            }}
          />
          <p className="text-3xl font-medium text-gray-800 mt-6">
            {" "}
            Register Your Hotel
          </p>

          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => SetName(e.target.value)}
              placeholder="Hotel Name"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1.5 text-sm outline-indigo-500 font-light"
              required
              id="name"
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              onChange={(e) => SetContact(e.target.value)}
              value={contact}
              type="text"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1.5 text-sm outline-indigo-500 font-light"
              required
              id="contact"
            />
          </div>
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              onChange={(e) => SetAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Type Here"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1.5 text-sm outline-indigo-500 font-light"
              required
              id="address"
            />
          </div>

          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              onChange={(e) => SetCity(e.target.value)}
              value={city}
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1.5 text-sm outline-indigo-500 font-light"
              required
            >
              <option value="">Select city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="px-4 py-2 mt-6 text-sm font-medium text-white bg-indigo-500 rounded hover:bg-indigo-600 transition-all cursor-pointer">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
