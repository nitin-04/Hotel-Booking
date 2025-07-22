import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <div className="flex flex-col items-center px-6 py-20 md:px-16 lg:px-24 bg-slate-50">
        <Title
          title="Featured Destinations"
          subTitle="Discover breathtaking places handpicked to inspire your next unforgettable escape."
        />

        <div className="flex flex-wrap items-center justify-center gap-4 mt-20">
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
        <button
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer"
          onClick={() => {
            navigate("/rooms");
            scrollTo(0, 0);
          }}
        >
          View All Destinations
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
