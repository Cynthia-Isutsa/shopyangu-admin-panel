"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Barcode, ChartColumnDecreasing, CircleDollarSign, House } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllProducts, fetchShops, } from "@/app/services/service";
import { Product } from "@/data";
import { Overview } from "./Overview";
import ProductsStatus from "./ProductsStatus";
import RealTimeUpdates from "./RealTimeUpdates";
import RecentShops from "./RecentShops";


const DashboardTabs = () => {
  const [shops, setShops] = useState<any>(); 
  const [products, setProducts] = useState<any>(); 
  const [error, setError] = useState(""); 

useEffect(() => {
  const loadShops = async () => {
    try {
      const data = await fetchShops(); 
      setShops(data); 
    } catch (error: any) {
      setError(" "); 
    }
  };

  loadShops(); 
}, []); 

useEffect(() => {
  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts(); 
      setProducts(data); 
    } catch (error: any) {
      setError(""); 
    }
  };

  loadProducts(); 
}, []); 

const calculateTotalPrice = (accumulator, product) => accumulator + product.price * product.stockLevel;
const totalPrice = products?.reduce(calculateTotalPrice, 0);
const calculateTotalStockLevel = (accumulator, product) => accumulator + product.stockLevel;
const totalStockLevel = products?.reduce(calculateTotalStockLevel, 0);

console.log("Total Stock Level:", totalStockLevel);
console.log("Total Price:", totalPrice);

console.log({products})
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview Metrics</TabsTrigger>
        <TabsTrigger value="productsStockStatus">
          Products Stock Status
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Total Number of Shops
              </CardTitle>
              <House />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shops?.length}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Total Number of Products
              </CardTitle>
             
              <Barcode />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products?.length}</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value of Products in Shops</CardTitle>
              <CircleDollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ksh.{totalPrice}</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stock Level</CardTitle>
              <ChartColumnDecreasing />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStockLevel}</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview products={products} />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent shops</CardTitle>
              <CardDescription>List of the last 10 shops Added.</CardDescription>
            </CardHeader>
            <CardContent><RecentShops shops={shops} /></CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="productsStockStatus" className="space-y-4">
        <ProductsStatus products={products} shops= {shops} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;

