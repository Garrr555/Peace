import { useNavigate } from "react-router";
import EventForm from "../../components/eventForm";
import CustomFetch from "../../config/db";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const navigate = useNavigate();
  const handelCreate = async (formData: FormData) => {
    try {
      const response = await CustomFetch.post("/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      toast.success("Berhasil Membuat Event");
      navigate("/dashboard/event");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Membuat Event");
    }
  };
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">Create Event</h1>
      <EventForm onSubmit={handelCreate} />
    </div>
  );
};

export default CreateEvent;
