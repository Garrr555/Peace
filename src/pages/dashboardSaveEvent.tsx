/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { BookingType } from "../types/type";
import { Link } from "react-router";
import {
  LayoutGrid,
  MoreVerticalIcon,
  PlusCircle,
  Table,
  TrashIcon,
} from "lucide-react";
import formatDateTime from "../hooks/time";
import { toast } from "react-toastify";
import type { TableColumn } from "../components/dataTable";
import DataTable from "../components/dataTable";
import DataCard from "../components/dataCard";

const DashboardSaveEvent = () => {
  const [events, setEvents] = useState<BookingType[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/booking/user");
    setEvents(response.data.booking);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const response = await CustomFetch.delete(`/booking/${id}`);

      console.log(response.data);
      toast.success("Unsave");
      getEventByUser();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Gagal Unsave");
    }
  };

  useEffect(() => {
    getEventByUser();
  }, []);

  const columns: TableColumn<BookingType>[] = [
    {
      header: "Image",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <img
            src={item?.event?.image}
            alt={item?.event?.name}
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
          <p className="font-semibold">{item?.event?.name}</p>

          <p className="line-clamp-2 text-sm text-gray-500">
            {item.event.description.substring(0, 30)} ...
          </p>
        </div>
      ),
    },
    {
      header: "Location",
      className: "text-center",
      render: (item) => item.event.location,
    },
    {
      header: "Date Save",
      className: "text-center",
      render: (item) => formatDateTime(item.CreatedAt),
    },
    {
      header: "Date Upload",
      className: "text-center",
      render: (item) => formatDateTime(item.event.CreatedAt),
    },
    {
      header: "Action",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center gap-2">
          <Link
            to={`/event/${item.event.ID}`}
            className="cursor-pointer rounded bg-indigo-600 px-3 py-2 text-white"
          >
            <MoreVerticalIcon />
          </Link>

          <button
            onClick={() => handleDeleteEvent(item.ID)}
            type="button"
            className="cursor-pointer rounded bg-red-600 px-3 py-2 text-white"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Event</h1>
          <p className="text-gray-500">Jumlah Event {events.length}</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl"></h1>
            <p className="text-gray-500"></p>
          </div>
          <Link
            to={`/dashboard/event/create`}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <PlusCircle />
          </Link>
        </div>
      </div>

      {/* Table */}
      {viewMode === "table" ? (
        <DataTable
          data={events}
          columns={columns}
          getRowKey={(item) => item.ID}
          maxHeight="66vh"
        />
      ) : (
        <DataCard
          data={events}
          columns={columns}
          getRowKey={(item) => item.ID}
          maxHeight="66vh"
        />
      )}

      {/* View Mode */}
      <div className="my-10 flex justify-end items-center gap-4">
        <div className="flex items-center rounded-lg border border-gray-300 bg-white p-1">
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`rounded-md p-2 transition ${
              viewMode === "table"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="Tampilan tabel"
          >
            <Table size={20} />
          </button>

          <button
            type="button"
            onClick={() => setViewMode("card")}
            className={`rounded-md p-2 transition ${
              viewMode === "card"
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            title="Tampilan card"
          >
            <LayoutGrid size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSaveEvent;
