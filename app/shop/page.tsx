"use client"

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { deleteShop, fetchShops } from "../services/service";
import { Button } from "@/components/ui/button";
import router from "next/router";
import { AddShop } from "@/components/AddShop";
import { Delete, Pencil } from "lucide-react";
import { EditShop } from "@/components/EditShop";
import { Shop } from "@/data";



const handleDelete = async (shopId: any) => {
  if (!shopId) return;

  try {
    const deletedProduct = await deleteShop(shopId);
    console.log({shopId})
    console.log('Deleted shop:', deletedProduct);
    // You might want to update the state or re-fetch the products after deletion
  } catch (error) {
    console.error('Failed to delete shop:', error);
  }
};

const handleEdit = (product: Shop) => {
  // Implement the edit logic, e.g., open an edit modal
  console.log('Editing shop:', product);
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
      accessorKey: "image",
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
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => {
        return (
          <div className="flex space-x-2">
            {/* <button onClick={() => handleEdit(info.row.original)}>
             
              <Pencil className="text-blue-500" />
            </button> */}
            <EditShop
              shopId={info.row.original.id} 
              initialData={info.row.original}
              />
            <button onClick={() => handleDelete(info.row.original.id)}>
              <Delete className="text-red-500" />
            </button>
          </div>
        );
      },
      meta: {
        style: { width: "150px" }, // Adjust the width as needed
      },
    },
  ];


  return (
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title="Shop Management" />
       <AddShop />
      </div>
      
      <DataTable columns={columns} data={shops} />
    </div>
  );
};

export default Page;
