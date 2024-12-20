"use client";

import PageTitle from "@/components/PageTitle";
import { ProductCard } from "@/components/ProductCard";
//import { Button } from "@/components/ui/button";
// import router from "next/router";
import React, { useEffect, useState } from "react";
import { fetchShops } from "../services/service";
import { Shop } from "@/types/data";

const Page = () => {
  const [shops, setShops] = useState<Shop[]>([]); 
 

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops(); 
        setShops(data); 
      } catch (error) {
        console.log(error)
      }
    };

    loadShops(); 
  }, []); 


  // const handleAddProductClick = () => {
  //   router.push("/addShop"); 
  // }
  return (
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title="Product Management" />
        {/* <Button
          variant="destructive"
          size="sm"
          onClick={handleAddProductClick}
          //disabled={!table.getCanPreviousPage()}
        >
          Add Shop
        </Button> */}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shops?.map((shop) => (
          <ProductCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default Page;
