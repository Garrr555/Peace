/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CustomFetch from "../config/db";
import type { BookingType, EventType } from "../types/type";
import {
  Bookmark,
  Calendar,
  FileIcon,
  LayoutGrid,
  MapPin,
  Table,
  UserIcon,
} from "lucide-react";
import formatDateTime from "../hooks/time";
import { toast } from "react-toastify";
import DataCard from "../components/dataCard";
import type { TableColumn } from "../components/dataTable";
import DataTable from "../components/dataTable";
import { useAuthStore } from "../store/auth.store";

function DetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [eventData, setEventData] = useState<EventType>();
  const [bookingData, setBookingData] = useState<BookingType[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const { user } = useAuthStore();
  console.log(user?.role);
  console.log(eventData);
  console.log(bookingData);

  const fetchDetailEvent = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get(`/events/${id}`);
      setEventData(response?.data?.event);
      setBookingData(response?.data?.event?.listBooking);
    } catch (error: any) {
      console.log(error.status);
      if (error.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadEvent = async (id: number) => {
    try {
      const response = await CustomFetch.get(`/event/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `event-${id}.png`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mendownload gambar event");
    }
  };

  const handleDownloadFile = async (id: number) => {
    try {
      const response = await CustomFetch.get(`/event/${id}/download/file`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `event-${id}-file`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mendownload File");
    }
  };

  const saveEvent = async (id: number) => {
    try {
      const response = await CustomFetch.post("/booking", {
        phone: "1234567890",
        eventId: id,
      });

      console.log(response.data);
      toast.success("Gambar berhasil disimpan");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Gagal menyimpan gambar");
    }
  };

  const columns: TableColumn<BookingType>[] = [
    {
      header: "Name",
      className: "text-left",
      render: (item) => (
        <div>
          <p className="font-semibold">{item.user.name}</p>

          <p className="line-clamp-2 text-sm text-gray-500">
            {item.user.email.substring(0, 30)} ...
          </p>
        </div>
      ),
    },
    {
      header: "Email",
      className: "text-center",
      render: (item) => item.user.email,
    },
    {
      header: "Save Date",
      className: "text-center",
      render: (item) => formatDateTime(item.CreatedAt),
    },
  ];

  useEffect(() => {
    if (id) {
      fetchDetailEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl my-32 mx-auto min-h-screen">
        <div className="flex items-center justify-center">
          <p className="absolute animate-ping text-blue-500 font-bold text-2xl">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen">
        <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
        <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Page Not Found
        </p>
        <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            to={"/event"}
            className="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="max-h-screen max-w-full lg:min-w-7xl my-32 mx-auto px-8 rounded-3xl flex flex-col justify-between items-center gap-5">
      {eventData && (
        <div className="min-w-1/2 p-6 bg-slate-50 rounded-3xl flex flex-col justify-center items-center gap-8">
          <div className="flex items-center justify-between">
            {eventData.image && (
              <img
                src={eventData.image}
                className="w-full h-96 object-contain"
                alt={eventData.name}
              />
            )}
            {eventData.file && (
              <div className="mrounded-lg border border-gray-300 p-4">
                <div className="mb-4 flex items-center gap-3">
                  <FileIcon className="size-8 shrink-0" />

                  <div className="min-w-0">
                    <p className="font-semibold">Event File</p>

                    <p className="truncate text-sm text-gray-500">
                      {eventData.file.split("/").pop()?.split("?")[0] || "File"}
                    </p>
                  </div>
                </div>

                {/* Preview PDF */}
                {eventData.file.toLowerCase().includes(".pdf") && (
                  <iframe
                    src={eventData.file}
                    className="h-96 w-full rounded-lg border"
                    title="File Preview"
                  />
                )}

                {/* Preview Image */}
                {/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(
                  eventData.file,
                ) && (
                  <img
                    src={eventData.file}
                    className="h-96 w-full rounded-lg object-contain"
                    alt="File Preview"
                  />
                )}

                {/* Tombol buka file */}
                <a
                  href={eventData.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                  Buka File
                </a>
              </div>
            )}
          </div>
          <div className="w-full">
            <h1 className="mt-6 text-4xl font-bold">{eventData.name}</h1>
            <div className="mt-6 leading-8 text-start bg-slate-100 px-5 py-3 rounded-3xl min-h-40">
              {eventData.description}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="mt-4 text-gray-500 flex gap-x-2">
                  <MapPin />
                  {eventData.location}
                </p>
                <p className="mt-4 text-gray-500 flex gap-x-2">
                  <Calendar />
                  {formatDateTime(eventData.CreatedAt)}
                </p>
              </div>
              <div>
                <p className="mt-4 text-gray-500 flex gap-x-2">
                  <Bookmark />
                  {bookingData.length}
                </p>
                <p className="mt-4 text-gray-500 flex gap-x-2">
                  <UserIcon />
                  {eventData.user.name}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full gap-5">
              <button
                onClick={() => handleDownloadEvent(eventData.ID)}
                className="mt-8 rounded-3xl w-full cursor-pointer bg-blue-500 px-6 py-3 text-white hover:bg-blue-700"
              >
                Download Image
              </button>
              <button
                onClick={() => saveEvent(eventData.ID)}
                className="mt-8 rounded-3xl w-full cursor-pointer bg-yellow-500 px-6 py-3 text-white hover:bg-blue-700"
              >
                Save Image
              </button>
              <button
                onClick={() => handleDownloadFile(eventData.ID)}
                className="mt-8 rounded-3xl w-full cursor-pointer bg-green-500 px-6 py-3 text-white hover:bg-blue-700"
              >
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {user?.role === "admin" && (
        <div className="w-1/2">
          <h1 className="font-bold text-2xl">
            Save by {bookingData.length} User
          </h1>
          {/* Table */}
          {viewMode === "table" ? (
            <DataTable
              data={bookingData}
              columns={columns}
              getRowKey={(item) => item.ID}
              maxHeight="66vh"
            />
          ) : (
            <DataCard
              data={bookingData}
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
        </div>
      )}
    </section>
  );
}

export default DetailPage;
