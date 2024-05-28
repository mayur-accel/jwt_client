"use client";

import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
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
      const result = await axiosInterceptorInstance.post(
        "/auth/register",
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
    } catch (err) {
      console.error(err);
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
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="destructive"
          onClick={handleRegister}
        >
          Register
        </Button>
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link className="text-blue-700" href={"/login"}>
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
