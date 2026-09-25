import { useNavigate } from "react-router";
import CustomFetch from "../../config/db";
import { toast } from "react-toastify";
import { useState } from "react";

const CreateDivisi = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const handelCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama divisi wajib diisi");
      return;
    }
    try {
      setLoading(true);
      const response = await CustomFetch.post("/divisis", {
        divisi: name.trim(),
      });
      console.log(response);
      toast.success("Berhasil Membuat Divisi");
      navigate("/dashboard/divisis");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Membuat Divisi");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-4xl">
      {" "}
      <h1 className="mb-6 text-2xl font-bold">Create Divisi</h1>{" "}
      <form
        onSubmit={handelCreate}
        className="rounded-lg border bg-white p-6 shadow-sm"
      >
        {" "}
        <div className="mb-5">
          {" "}
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {" "}
            Nama Divisi{" "}
          </label>{" "}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Technology"
            className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            disabled={loading}
          />{" "}
        </div>{" "}
        <div className="flex gap-3">
          {" "}
          <button
            type="button"
            onClick={() => navigate("/dashboard/tags")}
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            {" "}
            Batal{" "}
          </button>{" "}
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {" "}
            {loading ? "Menyimpan..." : "Simpan Divisi"}{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
};

export default CreateDivisi;
