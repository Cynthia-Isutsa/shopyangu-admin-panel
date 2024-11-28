'use client'



import { useSearchParams } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/DataTable'
import { useEffect, useState } from 'react'
import { deleteProduct, fetchProductsByShop } from '../services/service'
import { Product } from '@/data'
import { ColumnDef } from '@tanstack/react-table'
import router from 'next/router'
import { AddProduct } from '@/components/AddProduct'
import { Delete, Pencil } from 'lucide-react'

const page = () => {
  const searchParams = useSearchParams()
  const shopName = searchParams.get('shopName') || ''
  const shopId = searchParams.get("shopId") || "";
  const [products, setProducts] = useState<Product[]>([]); 
  const [error, setError] = useState<string | null>(null); 
  console.log({shopName, shopId})


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProductsByShop(shopId);
        setProducts(products); 
      } catch (error: any) {
        setError(error.message || 'Failed to load products.'); 
      }
    };
  
    if (shopId) {
      loadProducts();
    }
  }, [shopId]);

  const handleDelete = async (productId: any) => {
    if (!productId) return;
  
    try {
      const deletedProduct = await deleteProduct(productId);
      console.log('Deleted product:', deletedProduct);
      // You might want to update the state or re-fetch the products after deletion
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  
  const handleEdit = (product: Product) => {
    // Implement the edit logic, e.g., open an edit modal
    console.log('Editing product:', product);
  };
 
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Product Image",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="Product Image"
          style={{ width: "50px", height: "50px" }}
        />
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
        return `$${value.toFixed(2)}`;
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
            <button onClick={() => handleEdit(info.row.original)}>
             
              <Pencil className="text-blue-500" />
            </button>
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
  ]



  return (

  
    <div className="flex flex-col gap-5 w-full px-10">
      <div className="flex justify-between items-center px-10">
        <PageTitle title={`${shopName} Products`} />
        <AddProduct shopId={shopId} />
      </div>
      
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default page