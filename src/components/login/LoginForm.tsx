"use client";

import { config } from "@/config/config";
import { setAccessToken } from "@/utils/commonFunction";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Input from "../ui/Input";

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    try {
      console.log("login");
      const result = await axios.post(`${config.backendUrl}/auth/login`, data);
      if (result.data.status === 200) {
        await setAccessToken(result.data.data.token);
        router.push("/user/profile");
      } else {
        console.error("Login failed: ", result.data.message);
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
  };

  return (
    <div className="text-center w-1/5">
      <h2 className="text-6xl font-bold mb-10">Login Form</h2>
      <div className="flex flex-col gap-4 mb-10 w-full">
        {Object.keys(data).map((key: string) => (
          <Input
            key={key}
            name={key}
            onChange={handleChange}
            // @ts-ignore
            value={data[key]}
            placeholder={`Enter your ${key}`}
          />
        ))}
      </div>
      <button
        className="bg-red-700 py-3 px-4 font-semibold text-white rounded-md text-lg"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
