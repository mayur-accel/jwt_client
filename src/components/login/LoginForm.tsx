"use client";

import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { setAccessToken } from "@/utils/commonFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
      const result = await axiosInterceptorInstance.post(`/auth/login`, data);
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
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle className="text-4xl font-blod">Login Form</CardTitle>
        <CardDescription>Login and access your details</CardDescription>
      </CardHeader>
      <CardContent className="gap-2 flex flex-col">
        {Object.keys(data).map((key: string) => (
          <Fragment key={key}>
            <Label className="capitalize" htmlFor={key}>
              {key}
            </Label>
            <Input
              name={key}
              id={key}
              onChange={handleChange}
              // @ts-ignore
              value={data[key]}
              placeholder={`Enter your ${key}`}
            />
          </Fragment>
        ))}
        <div className="flex justify-end mt-4">
          <Link href={"/forgot-password"} className="text-blue-500 text-left">
            Forgot Password?
          </Link>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full" variant="destructive" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-gray-500">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?{" "}
          <Link className="text-blue-700" href={"/register"}>
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
