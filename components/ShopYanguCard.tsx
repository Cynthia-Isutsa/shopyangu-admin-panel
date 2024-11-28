import React from "react";

const ShopYanguCard = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-6 py-2 shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png" // Replace with your logo URL
          alt="ShopYangu Logo"
          className="h-8 w-8"
        />
        <span className="text-lg font-bold">ShopYangu</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Admin Panel</span>
        <div className="rounded-full bg-gray-700 p-2">
          <img
            src="/user-icon.png" // Replace with your user icon URL
            alt="User Icon"
            className="h-6 w-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopYanguCard;
