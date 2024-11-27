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

export const fetchProducts = async () => {
  try {
    s
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
