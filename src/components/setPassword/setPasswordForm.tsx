"use client";

import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

const SetPasswordForm = () => {
  const router = useRouter();
  const params = useParams();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSetPassword = async () => {
    try {
      const body = {
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
        resetToken: params.token,
      };
      const result = await axiosInterceptorInstance.post(
        `/auth/set-password`,
        body
      );
      if (result.data.status === 200) {
        router.push("/login");
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
        <CardTitle className="text-4xl font-blod">Set Password Form</CardTitle>
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
          onClick={handleSetPassword}
        >
          Set Password
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

export default SetPasswordForm;
