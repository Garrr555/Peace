/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import DataTable, { type TableColumn } from "../components/dataTable";
import CustomFetch from "../config/db";
import type { DivisiType } from "../types/type";
import formatDateTime from "../hooks/time";
import { Link } from "react-router";
import { MoreVerticalIcon, PlusCircle, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";

const DashboardDivisi = () => {
    const [divisis, setDivisis] = useState<DivisiType[]>([]);
    console.log(divisis)

  const getEventByTag = async () => {
    const response = await CustomFetch.get("/divisis");
    setDivisis(response.data.divisis);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      const confirm = window.confirm("Yakin ingin dihapus?");
      if (confirm) {
        await CustomFetch.delete(`/divisis/${id}`);
        toast.success("Berhasil Menghapus Divisi");
        getEventByTag();
      }
      return;
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menghapus Event");
    }
  };

  useEffect(() => {
    getEventByTag();
  }, []);

  const columns: TableColumn<DivisiType>[] = [
    {
      header: "Name",
      className: "text-left",
      render: (item) => (
        <div>
          <p className="font-semibold">{item.divisi}</p>
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
            to={`/divisi/${item.ID}`}
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
          <h1 className="font-bold text-2xl"></h1>
          <p className="text-gray-500"></p>
        </div>
        <Link
          to={`/dashboard/divisi/create`}
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
        >
          <PlusCircle />
        </Link>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Divisi</h1>
          <p className="text-gray-500">Jumlah Divisi {divisis.length}</p>
        </div>
      </div>

      <DataTable data={divisis} columns={columns} getRowKey={(item) => item.ID} />
    </>
  );
};

export default DashboardDivisi;
