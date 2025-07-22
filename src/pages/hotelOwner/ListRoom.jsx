import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);

  const { axios, getToken, user, currency } = useAppContext();

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      // console.log(data);

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(error.messsage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      // console.log("Response:", data);

      if (data.success) {
        if (data.isAvailable) {
          toast.success("Room is now available");
        } else {
          toast.success("Room is now unavailable");
        }
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);
  return (
    <div>
      <Title
        align="left"
        title="Room Listings"
        subTitle="List your rooms to attract more guests and boost your revenue."
      >
        <p className="text-gray-500 mt-8">All Rooms</p>
        <div className="w-full max-w-3xl overflow-y-scroll text-left border mt-3 border-gray-300 rounded-lg max-h-80">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-gray-800 font-medium">Name</th>
                <th className="py-2 px-4 text-gray-800 font-medium">
                  Facility
                </th>
                <th className="py-2 px-4 text-gray-800 font-medium">
                  Price/night
                </th>
                <th className="py-2 px-4 text-gray-800 font-medium text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rooms.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-gray-700 border-t border-gray-300">
                    {item.roomType}
                  </td>
                  <td className="py-2 px-4 text-gray-700 border-t border-gray-300">
                    {item.amenities.join(", ")}
                  </td>
                  <td className=" text-gray-700 border-t border-gray-300 py-2 px-4">
                    {currency} {item.pricePerNight}
                  </td>
                  <td className=" text-red-700 text-center text-sm border-t border-gray-300 py-2 px-4">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={() => toggleAvailability(item._id)}
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer  peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span
                        className="dot absolute left-1 top-1 w-5 h-5 bg-white
                       rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"
                      ></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Title>
    </div>
  );
};

export default ListRoom;
