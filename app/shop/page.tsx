'use client';

import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { deleteShop, fetchShops } from '../services/service';
import { AddShop } from '@/components/AddShop';
import { Delete } from 'lucide-react';
import { EditShop } from '@/components/EditShop';
import { Shop } from '@/data';

const Page = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [shopTypeFilter, setShopTypeFilter] = useState<string | null>(null);
  const [shopNameFilter, setShopNameFilter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadShops = async () => {
      try {
        const data = await fetchShops();
        setShops(data);
        setFilteredShops(data); 
      } catch (error: any) {
        setError(error.message);
      }
    };

    loadShops();
  }, []);

  useEffect(() => {
    const filterShops = () => {
      let result = [...shops];

      if (shopTypeFilter) {
        result = result.filter((shop) => shop.type === shopTypeFilter);
      }

      if (shopNameFilter) {
        result = result?.filter((shop) =>
          shop.name.toLowerCase().includes(shopNameFilter.toLowerCase())
        );
      }

      setFilteredShops(result);
    };

    filterShops();
  }, [shopTypeFilter, shopNameFilter, shops]);

  const handleDelete = async (shopId: any) => {
    if (!shopId) return;

    try {
      await deleteShop(shopId);
      setShops((prev) => prev?.filter((shop) => shop.id !== shopId));
    } catch (error) {
      console.error('Failed to delete shop:', error);
    }
  };

  const columns: ColumnDef<Shop>[] = [
    { accessorKey: 'name', header: 'Name', cell: (info) => info.getValue() },
    { accessorKey: 'type', header: 'Type', cell: (info) => info.getValue() },
    { accessorKey: 'description', header: 'Description', cell: (info) => info.getValue() },
    {
      accessorKey: 'image',
      header: 'Logo',
      cell: (info) => (
        <img
          src={info.getValue() as string || "/default.png"}
          alt="Shop Logo"
          style={{ width: '50px', height: '50px' }}
        />
      ),
    },
    { accessorKey: 'location', header: 'Location', cell: (info) => info.getValue() },
    { accessorKey: 'contact', header: 'Contact', cell: (info) => info.getValue() },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <EditShop shopId={info.row.original.id} initialData={info.row.original} />
          <button onClick={() => handleDelete(info.row.original.id)}>
            <Delete className="text-red-500" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title="Shop Management" />
        <AddShop />
      </div>

      <div className="flex gap-4 my-4">
        
        <select
          value={shopTypeFilter || ''}
          onChange={(e) => setShopTypeFilter(e.target.value || null)}
          className="border p-2 rounded w-40"
        >
          <option value="">All Types</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Retail">Retail</option>
          <option value="General">General</option>
        </select>

        
        <input
          type="text"
          placeholder="Filter by shop name"
          value={shopNameFilter || ''}
          onChange={(e) => setShopNameFilter(e.target.value || null)}
          className="border p-2 rounded w-300"
        />
      </div>

      <DataTable columns={columns} data={filteredShops} />
    </div>
  );
};

export default Page;
