import React from 'react';
// @ts-nocheck
const RecentShops = ({ shops }) => {
  const lastFiveShops = shops?.slice(-5) || null;

  return (
    <div>
      
      <ol style={{ marginBottom: '22px', listStyleType: 'decimal' }}>
        {lastFiveShops?.map((shop, index: number) => (
          <li style={{ marginBottom: '22px'}} key={index}>
            <strong>{shop?.name}</strong>  {shop?.location}, {shop?.contact}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecentShops;
