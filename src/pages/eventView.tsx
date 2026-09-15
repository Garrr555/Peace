/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, type ChangeEvent } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { useNavigate, useSearchParams } from "react-router";
import { Calendar, DollarSign, MapPin, Search, UserIcon } from "lucide-react";
import formatDateTime from "../hooks/time";
import useDebounce from "../hooks/debounce";
import Pagination from "../components/pagination";

export default function EventView() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalEvent, setTotalEvent] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || "");

  const [keyword, setKeyword] = useState(search);
  const debouncedKeyword = useDebounce(keyword, 500);

  const changeSearch = (value: string) => {
    setKeyword(value);
  };

  const changePage = (page: number) => {
    setSearchParams({
      page: page.toString(),
      search,
    });
  };

  const navigate = useNavigate();

  const handleDetail = (id: number) => {
    navigate(`/event/${id.toString()}`);
  };

  const getEventsData = async () => {
    try {
      const response = await CustomFetch.get("/events", {
        params: { limit: 6, page: page, search: search },
      });

      console.log(response);

      setEvents(response.data.event);
      setTotalPage(response.data.meta.totalPages);
      setTotalEvent(response.data.meta.totalRow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSearchParams({
      page: "1",
      search: debouncedKeyword,
    });
  }, [debouncedKeyword]);

  useEffect(() => {
    getEventsData();
  }, [page, search]);

  return (
    <section className="max-w-full my-32 mx-auto min-h-screen ">
      {/* Searching */}
      <div className="flex justify-between my-12">
        <h1 className="text-lg font-bold">Jumlah Event {totalEvent}</h1>
        <div className="w-full max-w-sm gap-3 flex items-center">
          <div className="flex items-center h-full w-full text-sm text-gray-500 bg-white border border-gray-500/30 rounded-2xl p-2">
            <button className="h-full px-3" type="button">
              <Search />
            </button>
            <input
              type="text"
              className="outline-none bg-transparent h-full w-full"
              placeholder="Searching Event ....."
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                changeSearch(e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 min-w-80"
          >
            <img
              className="rounded-md max-h-40 w-full object-cover"
              src={item.image}
              alt={item.name}
            />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
              {item.name}
            </p>
            <p className="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
              {item.description.substring(0, 65)}
            </p>
            <div className="flex flex-col my-2 text-xs gap-y-2">
              <div className="flex gap-x-2">
                <MapPin className="text-blue-300 size-4" />
                <p className="text-gray-400">{item.location}</p>
              </div>
              <div className="flex gap-x-2">
                <DollarSign className="text-blue-300 size-4" />
                <p className="text-gray-400">free</p>
              </div>
              <div className="flex gap-x-2">
                <Calendar className="text-blue-300 size-4" />
                <p className="text-gray-400">{formatDateTime(item.datetime)}</p>
              </div>
              <div className="flex gap-x-2">
                <UserIcon className="text-blue-300 size-4" />
                <p className="text-gray-400">{item.user.name}</p>
              </div>
            </div>
            <button
              className="bg-blue-500 mt-3 p-2 hover:bg-blue-600 w-full rounded-lg border-none text-white cursor-pointer"
              type="button"
              onClick={() => handleDetail(item.ID)}
            >
              Detail
            </button>
          </div>
        ))}
      </div>
      <div className="my-10 flex justify-center items-center">
        <Pagination onPage={changePage} totalPage={totalPage} page={page} />
      </div>
    </section>
  );
}
