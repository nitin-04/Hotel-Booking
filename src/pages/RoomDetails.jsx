import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";
import { FaLocationDot } from "react-icons/fa6";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, getToken, axios, navigate, user } = useAppContext();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailability = async () => {
    try {
      if (checkInDate >= checkOutDate) {
        toast.error("Check out date must be greater than check in date");
        return;
      }
      const { data } = await axios.post("api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available");
        } else {
          setIsAvailable(false);
          toast.error("Room is not available");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      // if (!user) {
      //   toast.error("Please login to book a room");
      // }
      e.preventDefault();
      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guests,
            paymentMethod: "Pay at Hotel",
          },
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          // toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Please login to book a room");
      // toast.error(error.message);
    }
  };

  useEffect(() => {
    const room = rooms.find((room) => room._id === id);
    room && setRoom(room);
    room && setMainImage(room.images[0]);
  }, [rooms]);

  // console.log(room);

  return (
    room && (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row md:items-center gap-2 items-start">
          <h1 className="font-serif text-3xl md:text-4xl">
            {room.hotel.name}{" "}
            <span className="font-serif text-sm">({room.roomType})</span>
          </h1>
          <p className="text-sm font-serif py-1.5 px-3 text-white bg-amber-400 rounded-full">
            25% off
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">300+ reviews</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <FaLocationDot />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room Image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="Room Image"
                  className={`w-full rounded-xl shadow-lg object-cover cursor-pointer ${
                    mainImage === image && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between mt-12">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-serif">
              Experience the Luxary Like Never Before
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 mb-6">
              {room.amenities.map((item, index) => {
                const Icon = facilityIcons[item];
                return (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200"
                    key={index}
                  >
                    {Icon && <Icon className="h-5 w-5 text-gray-600" />}
                    <p className="text-xs">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="font-medium text-2xl">₹{room.pricePerNight}/night</p>
        </div>

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col md:flex-row mt-16 items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto max-w-6xl"
        >
          <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500">
            <div className="flex flex-col">
              <label htmlFor="checkInDate" className="font-medium">
                Check-In
              </label>
              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                type="date"
                id="checkInDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="checkOutDate" className="font-medium">
                Check-Out
              </label>
              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
                disabled={!checkInDate}
                type="date"
                id="checkOutDate"
                placeholder="Check-In"
                className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
                required
              />
            </div>
            <div className="w-px h-15 bg-gray-300 max-md:hidden"></div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-medium">
                Guests
              </label>
              <input
                onChange={(e) => setGuests(e.target.value)}
                value={guests}
                type="number"
                id="guests"
                placeholder="0"
                className="max-w-20 rounded border border-gray-200 px-3 py-2 mt-1.5 text-sm outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-md active:scale-95 transition-all max-md:w-full max-md:mt-4 md:px-24 md:py-3
              text-base cursor-pointer hover:bg-gray-800 "
            >
              {isAvailable ? "Book Now" : "Check Availability"}
            </button>
          </div>
        </form>

        <div className="mt-25 space-y-4">
          {roomCommonData.map((spec, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={spec.icon}
                alt={`${spec.title}-icon`}
                className="h-5 w-5"
              />
              <div>
                <p className="text-base">{spec.title}</p>
                <p className="text-gray-500">{spec.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl border-y border-gray-200 py-8 my-14 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable two bedroom apartment has a true
            city feeling. the price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            the guest will be allocated ground floor according to availabilty.
            you get the comfortable two bedroom apartment has a true city
            feeling.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {/* <img
              src={room.image}
              alt="Mr.Sandeep"
              className="w-14 h-14 rounded-full md:h-18 md:w-18"
            /> */}
            <div>
              <p className="text-lg md:text-xl">Hosted by {room.hotel.name}</p>
              <div className="flex items-center gap-1 mt-1">
                <StarRating />
              </div>
            </div>
          </div>
          <button className="px-6 py-2.5 mt-4 rounded-2xl text-white bg-blue-700 hover:bg-blue-500 active:scale-95 transition-all cursor-pointer">
            Contact Now
          </button>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
