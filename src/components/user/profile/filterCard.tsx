import { Button } from "@/components/ui/button";
import { UserProfileFilterEnum } from "@/constant/constant";
import { Dispatch, FC, SetStateAction } from "react";

const filterArray = [
  {
    id: 101,
    value: UserProfileFilterEnum.profile,
    label: "Profile",
  },
  {
    id: 102,
    value: UserProfileFilterEnum.notification,
    label: "Notification",
  },
  {
    id: 103,
    value: UserProfileFilterEnum.newUpdate,
    label: "New update",
  },
  {
    id: 104,
    value: UserProfileFilterEnum.Setting,
    label: "Setting",
  },
];

interface IFilterCard {
  activeFilter: UserProfileFilterEnum;
  setActiveFilter: Dispatch<SetStateAction<UserProfileFilterEnum>>;
}

const FilterCard: FC<IFilterCard> = ({ activeFilter, setActiveFilter }) => {
  const handleClick = (item: UserProfileFilterEnum) => {
    setActiveFilter(item);
  };
  return (
    <div className="flex gap-2 mb-10">
      {filterArray.map((item) => (
        <Button
          variant={activeFilter === item.value ? "destructive" : "default"}
          onClick={() => handleClick(item.value)}
          key={item.id}
          className="rounded-3xl"
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterCard;
