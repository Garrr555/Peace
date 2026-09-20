/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CustomFetch from "../config/db";
import type { EventType, TagType } from "../types/type";
import DataTable from "../components/dataTable";
import DataCard, { type TableColumn } from "../components/dataCard";
import { LayoutGrid, MoreVerticalIcon, Table, TrashIcon } from "lucide-react";
import formatDateTime from "../hooks/time";
import { toast } from "react-toastify";

function DetailTagPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [tagData, setTagData] = useState<EventType[]>([]);
  const [tagName, setTagName] = useState<TagType>();
  console.log(tagData);
  console.log(tagName);

  const fetchDetailEvent = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get(`/events/tag/${id}`);
      const responseName = await CustomFetch.get(`/tags/${id}`);
      setTagData(response?.data?.events);
      setTagName(responseName?.data?.tag);
    } catch (error: any) {
      console.log(error.status);
      if (error.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const confirm = window.confirm("Yakin ingin dihapus?");
      if (confirm) {
        await CustomFetch.delete(`/events/${id}`);
        toast.success("Berhasil Menghapus Event");
        fetchDetailEvent();
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus Event");
    }
  };

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
    <section className="max-h-screen max-w-6xl lg:min-w-7xl my-32 mx-auto px-8">
      {tagData && (
        <div>
          <h1 className="mt-6 text-4xl font-bold text-center">
            Tags {tagName?.name}
          </h1>

          {/* Table */}
          {viewMode === "table" ? (
            <DataTable
              data={tagData}
              columns={columns}
              getRowKey={(item) => item.ID}
              maxHeight="66vh"
            />
          ) : (
            <DataCard
              data={tagData}
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
        </div>
      )}
    </section>
  );
}

export default DetailTagPage;
