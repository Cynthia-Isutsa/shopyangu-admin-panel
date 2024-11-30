'use client';

// import { useSearchParams } from 'next/navigation';
import PageTitle from '@/components/PageTitle';
import { DataTable } from '@/components/DataTable';
import { useEffect, useState } from 'react';
import { deleteProduct, fetchProductsByShop } from '../services/service';
import { Product } from '@/types/data';
import { ColumnDef } from '@tanstack/react-table';
import { EditProduct } from '@/components/EditProduct';
import { AddProduct } from '@/components/AddProduct';
import { Delete } from 'lucide-react';
import Image from 'next/image';
// import { useRouter } from 'next/router';

const Page = () => {
  const [shopId, setShopId] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);  // Access URL parameters directly

    const shopIdParam = urlParams.get('shopId');
    const shopNameParam = urlParams.get('shopName');

    // Set state if parameters exist
    if (shopIdParam) {
      setShopId(shopIdParam);
    }

    if (shopNameParam) {
      setShopName(shopNameParam);
    }
  }, []);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [stockFilter, setStockFilter] = useState<number | null>(null);
  //const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProductsByShop(shopId);
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.log(error)
      }
    };

    if (shopId) {
      loadProducts();
    }
  }, [shopId]);

  useEffect(() => {
    const filter = () => {
      let result = [...products];

      if (searchQuery) {
        result = result?.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (priceFilter !== null) {
        result = result?.filter((product) => product.price <= priceFilter);
      }

      if (stockFilter !== null) {
        result = result?.filter((product) => product.stockLevel >= stockFilter);
      }

      setFilteredProducts(result);
    };

    filter();
  }, [searchQuery, priceFilter, stockFilter, products]);

  const handleDelete = async (productId: string | undefined) => {
    if (!productId) return;

    try {
      const deletedProduct = await deleteProduct(productId);
      console.log('Deleted product:', deletedProduct);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Product Image",
      cell: (info) => (
        <Image
        src={info.getValue() as string || "/default.png"}
        alt="Shop Logo"
        width={50} 
        height={50} 
        style={{ objectFit: 'cover' }} 
      />
        // <img
        //   src={info.getValue() as string || "/default.png"}
        //   alt="Product Image"
        //   style={{ width: "50px", height: "50px" }}
        // />
      ),
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "150px" },
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => {
        const value = info.getValue() as number;
        return `Ksh.${value.toFixed(2)}`;
      },
      meta: {
        style: { width: "100px" },
      },
    },
    {
      accessorKey: "stockLevel",
      header: "Stock Level",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "120px" },
      },
    },
   
    {
      accessorKey: "category",
      header: "Category",
      cell: (info) => {
        const value = info.getValue() as string;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      meta: {
        style: { width: "120px" },
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (info) => info.getValue(),
      meta: {
        style: { width: "200px" },
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
            <EditProduct product={info?.row?.original} shopId= {info.row.original.shopId} />
            <button onClick={() => handleDelete(info?.row?.original?.id)}>
              <Delete className="text-red-500" />
            </button>
          </div>
        );
      },
      meta: {
        style: { width: "150px" }, // Adjust the width as needed
      },
    },
  ]

  return (
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title={`${shopName} Products`} />
        <AddProduct shopId={shopId} />
      </div>
      <div className="flex gap-4 my-8 mr-10">
        <input
          type="text"
          placeholder="Search by product's name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter || ''}
          onChange={(e) => setPriceFilter(e.target.value ? parseInt(e.target.value) : null)}
          className="border p-2 rounded w-100"
        />
        <input
          type="number"
          placeholder="Min Stock"
          value={stockFilter || ''}
          onChange={(e) => setStockFilter(e.target.value ? parseInt(e.target.value) : null)}
          className="border p-2 rounded w-100"
        />
      </div>

      <DataTable columns={columns} data={filteredProducts} />
    </div>
  );
};

export default Page;
