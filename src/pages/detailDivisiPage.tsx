/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CustomFetch from "../config/db";
import type { DivisiType, UserType } from "../types/type";
import {
  MoreVerticalIcon,
} from "lucide-react";
import DataTable, { type TableColumn } from "../components/dataTable";
import formatDateTime from "../hooks/time";

function DetailDivisiPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [divisiData, setDivisiData] = useState<DivisiType | null>(null);
  console.log(divisiData);

  const fetchDetailEvent = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get(`/divisis/${id}`);
      setDivisiData(response?.data?.divisi);
    } catch (error: any) {
      console.log(error.status);
      if (error.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumn<UserType>[] = [
    {
      header: "Name",
      className: "text-left",
      render: (item) => (
        <div>
          <p className="font-semibold">{item.name}</p>
        </div>
      ),
    },
    {
      header: "Register Date",
      className: "text-center",
      render: (item) => formatDateTime(item.CreatedAt),
    },
    {
      header: "Update Date",
      className: "text-center",
      render: (item) => formatDateTime(item.UpdatedAt),
    },
    {
      header: "Action",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center gap-2">
          <Link
            to={`/user/${item.ID}`}
            className="cursor-pointer rounded bg-indigo-600 px-3 py-2 text-white"
          >
            <MoreVerticalIcon />
          </Link>
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
    <div className="p-10 flex flex-col items-start justify-center">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Divisi</h1>
          <p className="text-gray-500">
            Jumlah Anggota {divisiData?.users.length}
          </p>
        </div>
      </div>

      <div className="w-full">
        <DataTable
          data={divisiData?.users ?? []}
          columns={columns}
          getRowKey={(item) => item.ID}
        />
      </div>
    </div>
  );
}

export default DetailDivisiPage;
