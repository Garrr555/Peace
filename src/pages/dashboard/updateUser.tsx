/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { UserType } from "../../types/type";
import CustomFetch from "../../config/db";
import { toast } from "react-toastify";
import UserForm from "../../components/userForm";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType>();

  const getUserById = async () => {
    try {
      const response = await CustomFetch.get(`/user/${id}`);

      console.log("USER DATA:", response.data);

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data user");
    }
  };

  const updateUserById = async (data: {
    name: string;
    email: string;
    role: string;
    platform: string;
    department: string;
    salary: number;
    divisiId: number | null;
  }) => {
    try {
      console.log("DATA UPDATE:", data);

      await CustomFetch.put(`/user/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("User berhasil di update");

      navigate("/dashboard/users");
    } catch (error) {
      console.log(error);
      toast.error("Gagal Update User");
    }
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">Update User</h1>

      {user && (
        <UserForm
          onSubmit={updateUserById}
          initialValue={{
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            platform: user.platform,
            salary: user.salary,
            divisiId: user.divisiId,
          }}
        />
      )}
    </div>
  );
};

export default UpdateUser;
