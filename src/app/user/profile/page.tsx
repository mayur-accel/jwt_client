"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/config/config";
import { getAccessToken } from "@/utils/commonFunction";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ChangeEvent, Fragment, useEffect, useState } from "react";

const filterArray = [
  {
    id: 101,
    label: "Profile",
    onClick: () => {},
  },
  {
    id: 102,
    label: "Notification",
    onClick: () => {},
  },
  {
    id: 103,
    label: "New update",
    onClick: () => {},
  },
  {
    id: 104,
    label: "Setting",
    onClick: () => {},
  },
];

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiString, setApiString] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const getData = async () => {
    const token: any = await getAccessToken("access-token");
    const decode: any = jwt.decode(token.value);

    const configg: any = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    };

    const result = await axios.get(
      `${config.backendUrl}/user/${decode.id}`,
      configg
    );
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

    const configg: any = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    };

    const updateData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const result = await axios.patch(
      `${config.backendUrl}/user/${decode.id}`,
      updateData,
      configg
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
    <div className="py-20 px-10">
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <>
          <div className="flex gap-2 mb-10">
            {filterArray.map((item) => (
              <Button key={item.id} className="rounded-3xl">
                {item.label}
              </Button>
            ))}
          </div>
          <div className="">
            <Card>
              <CardHeader className="text-2xl font-bold">Profile</CardHeader>
              <CardContent>
                {Object.keys(data).map((key) => (
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
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  disabled={handleCheckBtnDisabled()}
                  onClick={handleUpdate}
                >
                  Upadte
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
