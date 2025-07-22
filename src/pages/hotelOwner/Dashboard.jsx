import React, { useState } from "react";
import Title from "../../components/Title";
import { dashboardDummyData } from "../../assets/assets";
import { MdCollections } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);

  // console.log(dashboardData);

  return (
    <div>
      <Title
        align="left"
        title="Dashboard"
        // font="outline"
        subTitle="Monitor your room listings, track bookings and analyze revenue-all in one place. Stay updated with real time insights to ensure smooth operations"
      />
      <div className="flex gap-4 my-8">
        <div className="border bg-blue-50 border-blue-50 rounded  flex  p-4 pr-8">
          <MdCollections className="max-sm:hidden h-10" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-gray-800 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        <div className="border bg-blue-50 border-blue-50 rounded  flex  p-4 pr-8">
          <FaRupeeSign className="max-sm:hidden h-10" />

          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-gray-800 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-medium text-gray-900 mb-5">
        Recent Bookings
      </h2>
      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-2 px-4 text-gray-800 font-medium">Room Name</th>
              <th className="py-2 px-4 text-gray-800 font-medium">
                Total Amount
              </th>
              <th className="py-2 px-4 text-gray-800 font-medium">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-2 px-4 text-gray-700 border-t border-gray-300">
                  {item.room.roomType}
                </td>
                <td className="py-2 px-4 text-gray-700 border-t border-gray-300">
                  {item.totalPrice}
                </td>

                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  ${item.totalPrice}
                </td>

                <td className="py-2 px-4 text-gray-700 border-t border-gray-300 flex">
                  <button
                    className={`py-2 px-4 text-sm rounded-full mx-auto ${
                      item.isPaid
                        ? "bg-green-300 text-green-600"
                        : "bg-red-400 text-red-900"
                    }`}
                  >
                    {item.isPaid ? "Completed" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
