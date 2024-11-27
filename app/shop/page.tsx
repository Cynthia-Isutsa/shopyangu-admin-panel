"use client"

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { fetchShops } from "../services/service";




type Shop = {
  name: string;
  type: string;
  description: string;
  logo: string;
  location: string;
  contact: string;
};

const Page = () => {
  const [shops, setShops] = useState<Payment[]>([]); 
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch data when the component mounts
  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops(); 
        setShops(data); 
      } catch (error: any) {
        setError(error.message); // Handle errors
      }
    };

    loadShops(); // Trigger the data fetching
  }, []); // Empty dependency array ensures this runs once on component mount

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
      cell: (info) => info.getValue(),
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
      cell: (info) => info.getValue(),
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

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Shops" />
      <DataTable columns={columns} data={shops} />
    </div>
  );
};

export default Page;
