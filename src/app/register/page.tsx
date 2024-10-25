"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosInstance.post("http://localhost:3000/api/register", {
      firstname,
      lastname,
      email,
      password,
    });
    alert("Registered successfully!");
    router.push("/login");
  };

  return (
    <form
      onSubmit={handleRegister}
      className=" translate-y-[50%] flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="font-bold text-2xl">Register</h1>
      <input
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={firstname}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="first name"
      />
      <input
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="last name"
      />
      <input
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
