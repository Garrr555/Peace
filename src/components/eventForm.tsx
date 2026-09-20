/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { EventFormData } from "../types/type";
import { FileIcon, ImageIcon, Lock, Unlock } from "lucide-react";
import useTags from "../hooks/useTags";

interface EventFormProps {
  initialValue?: Partial<EventFormData>;
  onSubmit: (formData: FormData) => void;
}

const EventForm = ({ onSubmit, initialValue }: EventFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileFile, setFileFile] = useState<File | null>(null);
  const [privat, setPrivat] = useState(false);
  const [tagId, setTagId] = useState("");

  const [perview, setPerview] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [fileName, setFileName] = useState("");
  const { tags } = useTags();
  console.log(tags);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();

    const dateTime = new Date(datetime);

    data.append("name", name);
    data.append("description", description);
    data.append("location", location);
    data.append("datetime", dateTime.toISOString());
    data.append("private", privat.toString());

    if (imageFile) {
      data.append("image", imageFile);
    }

    // Upload file
    if (fileFile) {
      data.append("file", fileFile);
    }

    //
    if (tagId) {
      data.append("tagId", tagId);
    }

    onSubmit(data);
  };

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name!);
      setDescription(initialValue.description!);
      setLocation(initialValue.location!);
      setDatetime(initialValue.datetime!);
      setPrivat(initialValue.private!);
      setTagId(initialValue.tagId?.toString() || "");

      if (initialValue.image) {
        setPerview(initialValue.image);
      }

      if (initialValue.file) {
        const url = initialValue.file;

        const nameFromUrl = url.split("/").pop()?.split("?")[0];

        setFileName(nameFromUrl || "File tersedia");
        setFilePreview(url);
      }
    }
  }, [initialValue]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl p-6 shadow">
      <p className="mb-2 font-semibold">Event Name</p>
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className="mb-2 font-semibold">Event Description</p>
      <textarea
        rows={5}
        className="w-full rounded border  border-gray-500/30 p-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <p className="mb-2 font-semibold">Event Location</p>
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <p className="mb-2 font-semibold">Event Time</p>
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <p className="mb-2 font-semibold">Event Thumbnile</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImageFile(file);
          setPerview(URL.createObjectURL(file));
        }}
        className="w-full border px-3 py-2 border-gray-500/30"
      />
      {!perview ? (
        <div className="bg-slate-200 flex flex-col items-center justify-center rounded-xl py-5">
          <ImageIcon className="size-32" /> No Image
        </div>
      ) : (
        <img src={perview} className="h-72 w-full rounded-lg object-contain" />
      )}
      <div>
        <p className="mb-2 font-semibold">Event File</p>

        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setFileFile(file);
            setFileName(file.name);

            // Buat preview untuk file yang baru dipilih
            const previewUrl = URL.createObjectURL(file);
            setFilePreview(previewUrl);
          }}
          className="w-full border border-gray-500/30 px-3 py-2"
        />
      </div>
      {!filePreview ? (
        <div className="bg-slate-200 flex flex-col items-center justify-center rounded-xl py-5">
          <FileIcon className="size-32" /> No File
        </div>
      ) : (
        <div className="rounded-lg border border-gray-300 p-4">
          <div className="mb-3 flex items-center gap-3">
            <FileIcon className="size-8" />

            <div className="min-w-0">
              <p className="text-sm font-semibold">File</p>

              <p className="truncate text-sm text-gray-500">{fileName}</p>
            </div>
          </div>

          {/* Preview PDF */}
          {fileName.toLowerCase().endsWith(".pdf") && (
            <iframe
              src={filePreview}
              className="h-[80vh] w-full rounded-lg border"
              title="File Preview"
            />
          )}

          {/* Preview image jika ternyata file berupa gambar */}
          {fileFile?.type.startsWith("image/") && (
            <img
              src={filePreview}
              className="h-72 w-full rounded-lg object-contain"
              alt="File Preview"
            />
          )}

          {/* Tombol buka file */}
          <a
            href={filePreview}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Buka File
          </a>
        </div>
      )}
      {/* Tag */}{" "}
      <div>
        {" "}
        <label htmlFor="tag" className="mb-2 block font-semibold">
          {" "}
          Event Tag{" "}
        </label>{" "}
        <select
          id="tag"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          className="w-full rounded border border-gray-500/30 bg-white p-3"
        >
          {" "}
          <option value="">Tanpa Tag</option>{" "}
          {tags.map((tag) => (
            <option key={tag.ID} value={tag.ID}>
              {" "}
              {tag.name}{" "}
            </option>
          ))}{" "}
        </select>{" "}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4">
        <div>
          <p className="font-semibold">Private Event</p>
          <p className="text-sm text-gray-500">
            {privat
              ? "Event hanya dapat diakses secara private"
              : "Event dapat dilihat oleh semua orang"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPrivat((prev) => !prev)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white ${
            privat
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {privat ? (
            <>
              <Lock size={20} />
              Private
            </>
          ) : (
            <>
              <Unlock size={20} />
              Public
            </>
          )}
        </button>
      </div>
      <button
        className="rounded-lg w-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        type="submit"
      >
        Save Event
      </button>
    </form>
  );
};

export default EventForm;
