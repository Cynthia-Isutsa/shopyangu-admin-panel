import { Product } from "@/data";

export const fetchShops = async () => {
  try {
  
    const response = await fetch(`/api/v1/shops`);
    if (!response.ok) {
      throw new Error(`Error fetching shops: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error; 
  }
};

export const fetchProductsByShop = async (shopId: string): Promise<Product[]> => {
  try {
    const response = await fetch('/api/v1/products');

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format: "products" should be an array.');
    }

    return data.filter((product: any) => product.shopId === shopId);
  } catch (error: any) {
    console.error('Error fetching products for shop:', error.message || error);
    throw error;
  }
};


export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await fetch('/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error adding product:', error.message || error);
    throw error;
  }
};


export const deleteProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await fetch('/api/v1/products/:id', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error adding product:', error.message || error);
    throw error;
  }
};


