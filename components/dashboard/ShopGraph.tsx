import React from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function ShopGraph({ inStock, outOfStock, lowStock }) {
  // Data for the Pie chart
  const data = [
    { name: "In Stock", value: inStock.length, color: "#4CAF50" },
    { name: "Out of Stock", value: outOfStock.length, color: "#F44336" },
    { name: "Low Stock", value: lowStock.length, color: "#FFEB3B" },
  ];

  return (
    <div className="shop-graph">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          innerRadius={50}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${value} products`}
          labelFormatter={(label) => `${label}`}
        />
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="top"  
          iconType="circle"
          wrapperStyle={{
            position: "absolute",  
            right: "-150px",        
            top: "10%",             
            paddingLeft: "20px",    
          }}
        />
      </PieChart>
    </div>
  );
}

export default ShopGraph;
