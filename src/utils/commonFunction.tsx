"use server";
import { cookies } from "next/headers";

export const getAccessToken = async (key: string) => {
  const cookieStore = cookies();
  return cookieStore.get(key);
};

export const setAccessToken = async (token: string) => {
  cookies().set("access-token", token, {
    path: "/",
    domain: "localhost",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: false,
  });
};

export async function logout(token: string) {
  cookies().set("access-token", token, {
    path: "/",
    domain: "localhost",
    maxAge: -1,
    httpOnly: true,
    secure: false,
  });
}
