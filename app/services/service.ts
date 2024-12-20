import { Product, Shop } from "@/types/data";

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

export const fetchAllProducts = async ():Promise<Product[]>=> {
  try {
  
    const response = await fetch(`/api/v1/products`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching products:', error);
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

    return data?.filter((product) => product.shopId === shopId);
  } catch (error) {
    console.error('Error fetching products for shop:',  error);
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
  } catch (error) {
    console.error('Error adding product:',  error);
    throw error;
  }
};

export const addShop = async (product: Omit<Shop, 'id'>): Promise<Shop> => {
  try {
    const response = await fetch('/api/v1/shops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Failed to add shop: ${response.statusText}`);
    }

    const data: Shop = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding shop:', error);
    throw error;
  }
};




export const deleteProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`/api/v1/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const deleteShop = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`/api/v1/shops/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete shop: ${response.statusText}`);
    }

    return; 
  } catch (error) {
    console.error('Error deleting shop:', error);
    throw error;
  }
};

export const editProduct = async (id: string, updatedProduct: Partial<Product>): Promise<Product> => {
  try {
    const response = await fetch(`/api/v1/products/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit product: ${response.statusText}`);
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};


export const editShop = async (id: string, updatedShop: Partial<Shop>): Promise<Shop> => {
  try {
    const response = await fetch(`/api/v1/shops/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShop),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit shop: ${response.statusText}`);
    }

    const data: Shop = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing shop:', error);
    throw error;
  }
};



