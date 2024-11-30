import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Product {
  price: number;
  stockLevel: number;
  total: number;
}

interface OverviewProps {
  products: Product[];
}

const priceRanges = [
  { name: "0-1000", min: 0, max: 1000 },
  { name: "1001-5000", min: 1001, max: 5000 },
  { name: "5001-10000", min: 5001, max: 10000 },
  { name: "10001+", min: 10001, max: Infinity },
];

function groupByPriceRange(products: Product[]) {
  return priceRanges.map((range) => {
    const productsInRange = products.filter(
      (product) => product.price >= range.min && product.price <= range.max
    );

    const totalStockLevel = productsInRange.reduce((sum, product) => sum + product.stockLevel, 0);

    return {
      name: range.name,
      stockLevel: totalStockLevel,
    };
  });
}


export function Overview({ products }: OverviewProps) {
  const groupedData = groupByPriceRange(products);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Price Range (Ksh)", position: "bottom", fontSize: 14, offset: 0, mb:3}}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          label={{ value: "Stock Level", angle: -90, position: "insideLeft", fontSize: 14, offset: 10 }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="stockLevel"
          fill="#8884d8" 
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
