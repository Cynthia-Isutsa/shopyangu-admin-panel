import React from 'react';

const RecentShops = ({ shops }: any) => {
  const lastFiveShops = shops?.slice(-5) || null;

  return (
    <div>
      
      <ol style={{ marginBottom: '22px', listStyleType: 'decimal' }}>
        {lastFiveShops?.map((shop: any, index: any) => (
          <li style={{ marginBottom: '22px'}} key={index}>
            <strong>{shop?.name}</strong>  {shop?.location}, {shop?.contact}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecentShops;
