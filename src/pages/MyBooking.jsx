import React, { useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBooking = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  console.log(bookings);

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
                  {booking.hotel[0].name}
                  <span className="font-serif text-sm">
                    {" "}
                    ({booking.room.roomType})
                  </span>
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{booking.hotel[0].address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guest-icon" />
                  <span>Guests: {booking.guests}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Total: ${booking.totalPrice}
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
                <button className="text-sm text-blue-500 mt-2 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100 transition-all cursor-pointer">
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
