/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import CustomFetch from "../config/db";
import type { EventType } from "../types/type";
import { Link } from "react-router";
import { Pencil, PlusCircle, TrashIcon } from "lucide-react";
import formatDateTime from "../hooks/time";
import { toast } from "react-toastify";

const DashboardEvent = () => {
  const [events, setEvents] = useState<EventType[]>([]);

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

  useEffect(() => {
    getEventByUser();
  }, []);
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
      <div className="overflow-x-auto mt-5 rounded-xl shadow-xl">
        <table className="min-w-full">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-4 py-3 text-center">No</th>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3 text-left">Event</th>
              <th className="px-4 py-3 text-center">Location</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item, i) => (
              <tr key={i} className="border-b hover:bg-slate-100">
                <td className="px-4 py-3 text-center">{i + 1}</td>
                <td className="px-4 py-3 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="line-clamp-2 text-sm text-gray-500">
                      {item.description.substring(0, 30)} ...
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">{item.location}</td>
                <td className="px-4 py-3 text-center">{formatDateTime(item.datetime)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/dashboard/event/edit/${item.ID}`}
                      className="cursor-pointer rounded bg-yellow-500 px-3 py-2 text-white"
                    >
                      <Pencil />
                    </Link>
                    <button
                      onClick={() => handleDeleteEvent(item.ID)}
                      type="button"
                      className="rounded cursor-pointer bg-red-600 px-3 py-2 text-white"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardEvent;
