"use client";
import FilterCard from "@/components/user/profile/filterCard";
import NewUpdateCard from "@/components/user/profile/newUpdateCard";
import ProfileCard from "@/components/user/profile/profileCard";
import SettingCard from "@/components/user/profile/settingCard";
import { UserProfileFilterEnum } from "@/constant/constant";
import { useState } from "react";

const Page = () => {
  const [activeFilter, setActiveFilter] = useState(
    UserProfileFilterEnum.profile
  );

  const handleFilterRender = () => {
    switch (activeFilter) {
      case UserProfileFilterEnum.profile: {
        return <ProfileCard />;
      }
      case UserProfileFilterEnum.newUpdate: {
        return <NewUpdateCard />;
      }
      case UserProfileFilterEnum.notification: {
        return <NewUpdateCard />;
      }
      case UserProfileFilterEnum.Setting: {
        return <SettingCard />;
      }
    }
  };

  return (
    <div className="py-20 px-10">
      <FilterCard
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
      />
      {handleFilterRender()}
    </div>
  );
};

export default Page;
