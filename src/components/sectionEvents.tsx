/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { Link } from "react-router";
import { Loader2Icon } from "lucide-react";

const SectionEvents = () => {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<EventType[]>([]);

  console.log(eventData);

  const FetchEventLatest = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get("/events", {
        params: { limit: 8 },
      });

      setEventData(response.data?.event);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchEventLatest();
  }, []);

  return (
    <div className="min-h-full flex flex-col justify-center items-center">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <h1 className="text-3xl font-semibold text-center mx-auto">
        Our Latest Creations
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A visual collection of our most recent works - each piece crafted with
        intention, emotion, and style.
      </p>
      <div className="flex flex-wrap items-center justify-center mt-12 gap-4 max-w-5xl mx-auto">
        {loading ? (
          <Loader2Icon className="size-24" />
        ) : eventData.length ? (
          <>
            {eventData.map((event) => (
              <div
                key={event.ID}
                className="relative group rounded-lg overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="size-56 object-cover object-top"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h1 className="text-xl font-medium">{event.name}</h1>
                  <Link
                    to={`event/${event.ID}`}
                    className="flex items-center gap-1 text-sm text-white/70"
                  >
                    Show More
                  </Link>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-red-500 text-center font-bold">
            Error Gagal Mengambil Data
          </h1>
        )}
      </div>
    </div>
  );
};

export default SectionEvents;
