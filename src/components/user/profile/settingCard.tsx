import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { getAccessToken, logout } from "@/utils/commonFunction";
import { Label } from "@radix-ui/react-label";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";

const SettingCard = () => {
  const router = useRouter();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdate = async () => {
    const token: any = await getAccessToken("access-token");
    const decode: any = jwt.decode(token.value);

    await axiosInterceptorInstance.post(
      `/auth/reset-password?email=${decode.email}`,
      data
    );
    const tokenremove: any = await getAccessToken("access-token");
    await logout(tokenremove);
    router.push("/login");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <Card>
      <CardHeader className="text-2xl font-bold">Update Password</CardHeader>
      <CardContent>
        {Object.keys(data).map((key) => (
          <Fragment key={key}>
            <Label htmlFor={key} className="capitalize">
              {key.toLowerCase()}
            </Label>
            <Input
              className="mt-1 mb-4"
              // @ts-ignore
              value={data[key]}
              name={key}
              onChange={handleChange}
              id={key}
              placeholder={`Enter your ${key.toLowerCase()}`}
            />
          </Fragment>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdate}>Upadte</Button>
      </CardFooter>
    </Card>
  );
};

export default SettingCard;
