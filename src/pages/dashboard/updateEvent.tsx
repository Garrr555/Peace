/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { EventType } from "../../types/type";
import CustomFetch from "../../config/db";
import EventForm from "../../components/eventForm";
import { toast } from "react-toastify";

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventType>();
  console.log(event);

  const navigate = useNavigate();

  const getEventById = async () => {
    const response = await CustomFetch.get(`/events/${id}`);

    console.log(response);
    setEvent(response.data.event);
  };

  const updateEventById = async (formData: FormData) => {
    try {
      await CustomFetch.put(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event berhasil di update");
      navigate("/dashboard/event");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Update Event");
    }
  };

  useEffect(() => {
    if (id) {
      getEventById();
    }
  }, [id]);
  return (
    <div className="mx-auto max-w-4xl">
      <h1></h1>
      {event && (
        <EventForm
          onSubmit={updateEventById}
          initialValue={{
            name: event.name,
            description: event.description,
            location: event.location,
            datetime: event.datetime.substring(0, 16),
            image: event.image,
          }}
        />
      )}
    </div>
  );
};

export default UpdateEvent;
