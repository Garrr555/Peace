/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, type ChangeEvent } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { Link, useSearchParams } from "react-router";
import { Search, Pencil, TrashIcon, MoreVerticalIcon } from "lucide-react";
import formatDateTime from "../hooks/time";
import useDebounce from "../hooks/debounce";
import Pagination from "../components/pagination";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";
import DataTable, { type TableColumn } from "../components/dataTable";

export default function AllDashboardEvent() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [totalEvent, setTotalEvent] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  console.log(user);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "5");

  const [keyword, setKeyword] = useState(search);
  const debouncedKeyword = useDebounce(keyword, 500);

  const changeSearch = (value: string) => {
    setKeyword(value);
  };

  const changePage = (page: number) => {
    setSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      search,
    });
  };

  const changeLimit = (value: number) => {
    setSearchParams({
      page: "1",
      search,
      limit: value.toString(),
    });
  };

  const getEventsData = async () => {
    try {
      const response = await CustomFetch.get("/events", {
        params: {
          limit: limit,
          page: page,
          search: search,
        },
      });

      console.log(response);

      setEvents(response.data.event);
      setTotalPage(response.data.meta.totalPages);
      setTotalEvent(response.data.meta.totalRow);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const confirm = window.confirm("Yakin ingin dihapus?");
      if (confirm) {
        await CustomFetch.delete(`/events/${id}`);
        toast.success("Berhasil Menghapus Event");
        getEventsData();
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus Event");
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
  }, [page, search, limit]);

  const columns: TableColumn<EventType>[] = [
    {
      header: "Image",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-24 rounded-lg object-cover"
          />
        </div>
      ),
    },
    {
      header: "Event",
      className: "text-left",
      render: (item) => (
        <div>
          <p className="font-semibold">{item.name}</p>

          <p className="line-clamp-2 text-sm text-gray-500">
            {item.description.substring(0, 30)} ...
          </p>
        </div>
      ),
    },
    {
      header: "Location",
      className: "text-center",
      render: (item) => item.location,
    },
    {
      header: "Date",
      className: "text-center",
      render: (item) => formatDateTime(item.datetime),
    },
    {
      header: "Action",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center gap-2">
          <Link
            to={`/event/${item.ID}`}
            className="cursor-pointer rounded bg-indigo-600 px-3 py-2 text-white"
          >
            <MoreVerticalIcon />
          </Link>

          <Link
            to={`/dashboard/event/edit/${item.ID}`}
            className="cursor-pointer rounded bg-yellow-500 px-3 py-2 text-white"
          >
            <Pencil />
          </Link>

          <button
            onClick={() => handleDeleteEvent(item.ID)}
            type="button"
            disabled={user?.role !== "admin" && item.user.ID !== user?.id}
            className={`rounded px-3 py-2 text-white ${
              user?.role === "admin" || item.user.ID === user?.id
                ? "bg-red-600 cursor-pointer"
                : "bg-slate-500 disabled"
            }`}
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Event</h1>
          <p className="text-gray-500">Jumlah Event {totalEvent}</p>
        </div>

        {/* Search */}
        <div className="w-full max-w-sm">
          <div className="flex items-center h-full w-full text-sm text-gray-500 bg-white border border-gray-500/30 rounded-lg p-2">
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

      {/* Table */}
      <DataTable
        data={events}
        columns={columns}
        getRowKey={(item) => item.ID}
        page={page}
        limit={limit}
        maxHeight="66vh"
      />

      {/* Pagination */}
      <div className="my-10 flex justify-between items-center gap-4">
        <Pagination onPage={changePage} totalPage={totalPage} page={page} />

        <div className="flex items-center gap-2">
          <select
            value={limit}
            onChange={(e) => changeLimit(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </>
  );
}
