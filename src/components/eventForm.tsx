/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { EventFormData } from "../types/type";
import { ImageIcon } from "lucide-react";

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

  const [perview, setPerview] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = new FormData();

    const dateTime = new Date(datetime);

    data.append("name", name);
    data.append("description", description);
    data.append("location", location);
    data.append("datetime", dateTime.toISOString());

    if (imageFile) {
      data.append("image", imageFile);
    }

    onSubmit(data);
  };

  useEffect(() => {
    if (initialValue) {
      setName(initialValue.name!);
      setDescription(initialValue.description!);
      setLocation(initialValue.description!);
      setDatetime(initialValue.datetime!);

      if (initialValue.image) {
        setPerview(initialValue.image);
      }
    }
  }, [initialValue]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl p-6 shadow">
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        rows={5}
        className="w-full rounded border  border-gray-500/30 p-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        className="w-full rounded border border-gray-500/30 p-3"
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImageFile(file);
          setPerview(URL.createObjectURL(file));
        }}
        className="mt-5 w-full border px-3 py-2 border-gray-500/30"
      />
      {!perview ? (
        <div className="bg-slate-200 flex flex-col items-center justify-center rounded-xl py-5">
          <ImageIcon className="size-32" /> No Image
        </div>
      ) : (
        <img src={perview} className="h-72 w-full rounded-lg object-contain" />
      )}
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
