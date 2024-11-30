import React from 'react'

const TopShops = ({topShops}) => {
  return (
    <div>
        <ol style={{ paddingBottom: "20px",  listStyleType: 'decimal'}}>
          {topShops.map((shop) => (
            <li key={shop.id} style={{ marginBottom: '22px'}}>
              <strong>{shop.name}</strong>: {shop.totalStockLevel} items
            </li>
          ))}
        </ol>
      </div>
  )
}

export default TopShops