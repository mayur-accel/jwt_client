"use client";
import { getAccessToken, logout } from "@/utils/commonFunction";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const token: any = getAccessToken("access-token");
    await logout(token);
    router.push("/login");
  };

  return (
    <div className="bg-blue-600 py-3 px-2 w-100 flex justify-between gap-4">
      <h2 className="font-bold text-white">Mayur</h2>
      <button
        onClick={handleLogout}
        className="text-white font-bold cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
