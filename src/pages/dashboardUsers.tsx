/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import DataTable, { type TableColumn } from "../components/dataTable";
import CustomFetch from "../config/db";
import type { UserType } from "../types/type";
import formatDateTime from "../hooks/time";
import { Link } from "react-router";
import { MoreVerticalIcon } from "lucide-react";

const DashboardUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  console.log(users);

  const getEventByUser = async () => {
    const response = await CustomFetch.get("/users");
    console.log(response);
    setUsers(response.data.users);
  };

  useEffect(() => {
    getEventByUser();
  }, []);

  const columns: TableColumn<UserType>[] = [
    {
      header: "Name",
      className: "text-left",
      render: (item) => (
        <div>
          <p className="font-semibold">{item.name}</p>

          <p className="line-clamp-2 text-sm text-gray-500">{item.role}</p>
        </div>
      ),
    },
    {
      header: "Email",
      className: "text-left",
      render: (item) => item.email,
    },
    {
      header: "Role",
      className: "text-center",
      render: (item) => item.role,
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

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl">Users</h1>
          <p className="text-gray-500">Jumlah User {users.length}</p>
        </div>
      </div>

      {/* Table */}
      <DataTable data={users} columns={columns} getRowKey={(item) => item.ID} />
    </>
  );
};

export default DashboardUsers;
