/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import CustomFetch from "../config/db";
import type { UserType } from "../types/type";
import { Mail, UserCircle, UserIcon } from "lucide-react";

function DetailUserPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [userData, setUserData] = useState<UserType>();

  const fetchDetailEvent = async () => {
    setLoading(true);
    try {
      const response = await CustomFetch.get(`/user/${id}`);
      setUserData(response?.data?.user);
    } catch (error: any) {
      console.log(error.status);
      if (error.status === 404) {
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

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
      {userData && (
        <div className="mx-auto max-w-5xl p-6">
          {userData.image ? (
            <img
              src={userData.image}
              className="w-full h-96 object-contain"
              alt={userData.name}
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <UserCircle className="w-48 h-48 text-gray-400" />
            </div>
          )}
          <h1 className="mt-6 text-4xl font-bold">{userData.name}</h1>
          <p className="mt-4 text-gray-500 flex gap-x-2">
            <Mail />
            {userData.email}
          </p>
          <p className="mt-4 text-gray-500 flex gap-x-2">
            <UserIcon />
            {userData.role}
          </p>
        </div>
      )}
    </section>
  );
}

export default DetailUserPage;
