import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const RecommendedHotels = () => {
  const { rooms, searchedCities } = useAppContext();
  // console.log("recommended", rooms);
  // console.log("recommended citites", searchedCities);

  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 &&
    recommended.length < 4 && (
      <div className="flex flex-col items-center px-6 py-20 md:px-16 lg:px-24 bg-slate-50">
        <Title
          title="Recommended Hotels"
          subTitle="Discover breathtaking places handpicked to inspire your next unforgettable escape."
        />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] justify-items-center gap-2 mt-20 w-full">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;
