"use client"

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { fetchShops } from "../services/service";
import { Button } from "@/components/ui/button";
import router from "next/router";




type Shop = {
  name: string;
  type: string;
  description: string;
  logo: string;
  location: string;
  contact: string;
};

const Page = () => {
  const [shops, setShops] = useState<Shop[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops(); 
        setShops(data); 
      } catch (error: any) {
        setError(error.message); 
      }
    };

    loadShops(); 
  }, []); 

  console.log({shops})
  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns: ColumnDef<Shop>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => {
        const value = info.getValue() as string;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "logo",
      header: "Logo",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="Shop Logo"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: (info) => {
        const value = info.getValue() as string;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "100px" },
      },
    },
  ];

  const handleAddShopClick = () => {
    router.push("/addShop"); 
  }

  return (
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title="Shop Management" />
        <Button
          variant="destructive"
          size="sm"
          onClick={handleAddShopClick}
          //disabled={!table.getCanPreviousPage()}
        >
          Add Shop
        </Button>
      </div>
      
      <DataTable columns={columns} data={shops} />
    </div>
  );
};

export default Page;
