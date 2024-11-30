export interface Shop {
    id?: string;
    name: string;
    type: "General" | "Wholesale" | "Retail",
    description: string;
    logo: string; 
    location: string; 
    contact: string;
}

export interface Product {
    id?: string;
    shopId: string;
    name: string;
    price: number;
    stockLevel: number;
    image: string;
    category: "Electronics" | "Clothing" | "Food" | "Furniture"
    description: string;
    
  }

  