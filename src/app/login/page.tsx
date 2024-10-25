"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });

    router.push("/users"); // Redirect to home or dashboard
  };

  return (
    <form
      onSubmit={handleLogin}
      className="  translate-y-[50%] flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md "
    >
      <h1 className="font-bold text-2xl">Login</h1>
      <input
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
