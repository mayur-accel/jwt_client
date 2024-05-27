"use client";

import { config } from "@/config/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Input from "../ui/Input";

const RegisterForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleRegister = async () => {
    try {
      console.log("register");
      const result = await axios.post(
        config.backendUrl + "/auth/register",
        data
      );

      if (result.status === 201) {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/login");
      }
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="text-center w-1/5">
      <h2 className="text-6xl font-bold mb-10">Register Form</h2>
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
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
