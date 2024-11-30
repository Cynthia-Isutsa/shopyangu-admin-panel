import React from 'react'

const TopShops = ({topShops}) => {
  return (
    <div>
        <h4>Top 5 Shops by Stock Level:</h4>
        <ol style={{ paddingBottom: "20px" }}>
          {topShops.map((shop) => (
            <li key={shop.id}>
              <strong>{shop.name}</strong>: {shop.totalStockLevel} items
            </li>
          ))}
        </ol>
      </div>
  )
}

export default TopShops