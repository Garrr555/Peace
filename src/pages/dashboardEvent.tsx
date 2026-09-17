/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { Link } from "react-router";
import { LayoutGrid, MoreVerticalIcon, Pencil, PlusCircle, Table, TrashIcon } from "lucide-react";
import formatDateTime from "../hooks/time";
import { toast } from "react-toastify";
import type { TableColumn } from "../components/dataTable";
import DataTable from "../components/dataTable";
import DataCard from "../components/dataCard";

const DashboardEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  console.log(events);

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/events/user");
    console.log(response);
    setEvents(response.data.events);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const confirm = window.confirm("Yakin ingin dihapus?");
      if (confirm) {
        await CustomFetch.delete(`/events/${id}`);
        toast.success("Berhasil Menghapus Event");
        getEventByUser();
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus Event");
    }
  };

  // const handleDownloadEvent = async (id: number) => {
  //   try {
  //     const response = await CustomFetch.get(`/event/${id}/download`, {
  //       responseType: "blob",
  //     });

  //     const url = window.URL.createObjectURL(response.data);

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `event-${id}.png`;

  //     document.body.appendChild(link);
  //     link.click();

  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Gagal mendownload gambar event");
  //   }
  // };

  useEffect(() => {
    getEventByUser();
  }, []);

  const columns: TableColumn<EventType>[] = [
    {
      header: "Image",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center">
          <img
            src={item.image}
            alt={item.name}
            className="w-full rounded-lg object-cover"
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
            className="cursor-pointer rounded bg-blue-600 px-3 py-2 text-white"
          >
            <MoreVerticalIcon />
          </Link>
          {/* <button
            onClick={() => handleDownloadEvent(item.ID)}
            className="cursor-pointer rounded bg-green-600 px-3 py-2 text-white"
          >
            <DownloadIcon />
          </button> */}
          <Link
            to={`/dashboard/event/edit/${item.ID}`}
            className="cursor-pointer rounded bg-yellow-500 px-3 py-2 text-white"
          >
            <Pencil />
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
          maxHeight="100vh"
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

export default DashboardEvent;
