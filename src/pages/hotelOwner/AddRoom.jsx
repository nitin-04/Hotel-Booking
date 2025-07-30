import { useState } from "react";
import Title from "../../components/Title";
import { IoMdCloudUpload } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Room Service": false,
      "Free WiFi": false,
      "Mountain View": false,
      "Pool Access": false,
      "Breakfast Included": false,
    },
  });

  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !inputs.amenities ||
      !Object.values(images).some((image) => image)
    ) {
      toast.error("Please fill in all the required fields");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));
      Object.keys(images).forEach((key) => {
        images[key] && formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      // console.log("Data", data);

      if (data.success) {
        toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Room Service": false,
            "Free WiFi": false,
            "Mountain View": false,
            "Pool Access": false,
            "Breakfast Included": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        title="Add Room"
        font="crimson-text-regular"
        subtitle="Fill in the details carefully and accurate room details, pricing and amenities, to enhance the user booking experience."
      />
      <p className="text-gray-800 mt-10">Upload Room Images Here</p>
      <div className="grid grid-cols-2 gap-4 sm:flex my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImages${key}`} key={key}>
            <div className="w-32 h-32 border border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer overflow-hidden">
              {images[key] ? (
                <img
                  src={URL.createObjectURL(images[key])}
                  alt="RoomImage"
                  className="object-cover w-full h-full"
                />
              ) : (
                <IoMdCloudUpload className="text-4xl text-gray-800" />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              id={`roomImages${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1/2 max-w-48">
          <p className="text-gray-800 mt-4"> Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="border opacity-70 border-gray-200 rounded p-2 w-full mt-1.5 outline-none"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">family Suite</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price<span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="border opacity-70 border-gray-200 rounded w-full px-3 py-2.5 mt-1.5 text-sm outline-none"
          />
        </div>
      </div>

      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-wrap flex-col mt-1 text-gray-800 gap-2 space-x-10 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <label
            key={index}
            htmlFor={`amenities${index + 1}`}
            className="flex items-center gap-2"
          >
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            {amenity}
          </label>
        ))}
      </div>

      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded mt-4 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Adding Room..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
