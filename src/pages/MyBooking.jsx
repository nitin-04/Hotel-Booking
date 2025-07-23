import { useState } from "react";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const MyBooking = () => {
  const { axios, getToken, user } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      // console.log("Booking", data);

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/stripe-payment",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      console.log(data);

      if (data.success) {
        window.location.href = data.url;
        console.log("window", window.location.href);

        // toast.success(data.message);
      } else {
        console.log(data);

        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);
  // console.log(bookings);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      <Title
        title="My Booking"
        subTitle="Easily manage your past, current and upcoming hotel experience hotel reservations in one place. Plan your trips seamlessly just a few clicks away"
        align="left"
      />
      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-6 first:border-t"
          >
            <div className="flex flex-col md:flex-row">
              <img
                src={booking.room.images[0]}
                alt="RoomImage"
                className="min-md:w-44 rounded shadow object-cover"
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="font-serif text-2xl">
                  {booking.hotel.name}
                  <span className="font-serif text-sm">
                    {" "}
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaLocationDot />
                  <span>{booking.hotel.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <IoPersonSharp />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Total: ₹{booking.totalPrice}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-3 md:items-start">
              <div>
                <p>Check-In:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>

              <div>
                <p>Check-Out:</p>
                <p className="text-gray-500 text-sm">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center pt-3">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    booking.isPaid ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Not Paid"}
                </p>
              </div>
              {!booking.isPaid && (
                <button
                  onClick={() => handlePayment(booking._id)}
                  className="text-sm text-blue-500 mt-2 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
