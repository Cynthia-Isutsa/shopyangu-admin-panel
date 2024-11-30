import { UserRoundSearch } from "lucide-react";
import React from "react";
import Image from "next/image";

const ShopYanguCard = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-20 py-2 shadow-md">
      <div className="flex items-center space-x-3">
        <Image
          src="/shopyangu.png"
          alt="ShopYangu Logo"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-lg font-bold">ShopYangu</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Admin Panel</span>
        <div className="rounded-full bg-gray-700 p-2">
          <UserRoundSearch size={25} />
        </div>
      </div>
    </div>
  );
};

export default ShopYanguCard;
