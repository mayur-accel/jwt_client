"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { config } from "@/config/config";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { getAccessToken } from "@/utils/commonFunction";
import { Label } from "@radix-ui/react-label";
import jwt from "jsonwebtoken";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

const ProfileCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiString, setApiString] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const getData = async () => {
    try {
      const token: any = await getAccessToken("access-token");
      const decode: any = jwt.decode(token.value);

      const result = await axiosInterceptorInstance.get(`/user/${decode.id}`);
      setData({
        firstName: result.data.data.firstName,
        lastName: result.data.data.lastName,
        email: result.data.data.email,
      });
      const str = {
        firstName: result.data.data.firstName,
        lastName: result.data.data.lastName,
      };
      setApiString(JSON.stringify(str));
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = async () => {
    const token: any = await getAccessToken("access-token");
    const decode: any = jwt.decode(token.value);

    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    await axiosInterceptorInstance.patch(
      `${config.backendUrl}/user/${decode.id}`,
      updateData
    );

    const str = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    setApiString(JSON.stringify(str));
  };

  const handleCheckBtnDisabled = () => {
    const str = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
    });
    return str === apiString;
  };

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">Profile</CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          Object.keys(data).map((key) => (
            <Fragment key={key}>
              <Label className="capitalize" htmlFor={key}>
                {key.toLowerCase()}
              </Label>
              <Input
                // @ts-ignore
                value={data[key]}
                name={key}
                id={key}
                onChange={handleChange}
                disabled={key === "email" ? true : false}
                className={`${key === "email" ? "" : "mb-4"} mt-1`}
                placeholder={`Enter your ${key.toLowerCase()}`}
              />
            </Fragment>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button disabled={handleCheckBtnDisabled()} onClick={handleUpdate}>
          Upadte
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
