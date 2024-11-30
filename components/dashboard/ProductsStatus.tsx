import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  House,
  Barcode,
  CircleDollarSign,
  Maximize2,
  Minimize,
  CircleSlash2,
  // ChartColumnDecreasing,
} from "lucide-react";
import ShopGraph from "./ShopGraph";
import TopShops from "./TopShops";

const ProductsStatus = ({shops, products}) => {
  console.log({shops})
  console.log({products})

  const inStock = products.filter((product) => product.stockLevel > 5);
  const outOfStock = products.filter((product) => product.stockLevel === 0);
  const lowStock = products.filter(
    (product) => product.stockLevel > 0 && product.stockLevel <= 5
  );



  const top5Shops = getTop5ShopsByStockLevel(shops, products);

  console.log({ inStock, outOfStock, lowStock, top5Shops });
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Maximize2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inStock?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>

            <CircleSlash2 />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStock?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Minimize />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStock?.length || 0}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Stock Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ShopGraph inStock={inStock} outOfStock={outOfStock} lowStock={lowStock} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top 5 Shops</CardTitle>
            <CardDescription>
              List of the top 5 shops by stock level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopShops topShops={top5Shops} products = {products} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductsStatus;



const getTop5ShopsByStockLevel = (shops, products) => {
  const shopStockLevels = products.reduce((acc, product) => {
    const { shopId, stockLevel } = product;
    acc[shopId] = (acc[shopId] || 0) + stockLevel;
    return acc;
  }, {});

  const shopsWithStockLevels = shops.map((shop) => ({
    ...shop,
    totalStockLevel: shopStockLevels[shop.id] || 0, 
  }));

  return shopsWithStockLevels
    .sort((a, b) => b.totalStockLevel - a.totalStockLevel)
    .slice(0, 5);
};