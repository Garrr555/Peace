import { useEffect, useState } from "react";
import useDivisis from "../hooks/useDivisis";

export interface UserFormData {
  name: string;
  email: string;
  role: string;
  platform: string;
  department: string;
  salary: number;
  divisiId: number | null;
}

interface UserFormProps {
  initialValue?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
}

const UserForm = ({ onSubmit, initialValue }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [platform, setPlatform] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState(0);
  const [divisiId, setDivisiId] = useState<number | null>(null);

  const { divisis } = useDivisis();

  useEffect(() => {
    if (!initialValue) return;

    setName(initialValue.name || "");
    setEmail(initialValue.email || "");
    setRole(initialValue.role || "");
    setPlatform(initialValue.platform || "");
    setDepartment(initialValue.department || "");
    setSalary(initialValue.salary || 0);
    setDivisiId(initialValue.divisiId ?? null);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserFormData = {
      name,
      email,
      role,
      platform,
      department,
      salary,
      divisiId,
    };

    console.log("JSON YANG DIKIRIM:", data);

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-gray-500/20 bg-white p-6 shadow"
    >
      {/* NAME */}
      <div>
        <p className="mb-2 font-semibold">User Name</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="text"
          placeholder="User Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div>
        <p className="mb-2 font-semibold">User Email</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* ROLE */}
      <div>
        <p className="mb-2 font-semibold">User Role</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="text"
          placeholder="User Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      {/* PLATFORM */}
      <div>
        <p className="mb-2 font-semibold">User Platform</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="text"
          placeholder="User Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />
      </div>

      {/* DEPARTMENT */}
      <div>
        <p className="mb-2 font-semibold">User Department</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="text"
          placeholder="User Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      {/* DIVISI */}
      <div>
        <label htmlFor="divisi" className="mb-2 block font-semibold">
          User Divisi
        </label>

        <select
          id="divisi"
          value={divisiId ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            setDivisiId(value ? Number(value) : null);
          }}
          className="w-full rounded border border-gray-500/30 bg-white p-3"
        >
          <option value="">Tanpa Divisi</option>

          {divisis.map((divisi) => (
            <option key={divisi.ID} value={divisi.ID}>
              {divisi.divisi}
            </option>
          ))}
        </select>
      </div>

      {/* SALARY */}
      <div>
        <p className="mb-2 font-semibold">User Salary</p>

        <input
          className="w-full rounded border border-gray-500/30 p-3"
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Update User
      </button>
    </form>
  );
};

export default UserForm;
