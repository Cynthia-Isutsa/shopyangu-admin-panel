import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addProduct } from "@/app/services/service";
import { Product } from "@/data"; // Import Product type from data.d.ts

export function AddProduct({ shopId }: any) {
  const [formData, setFormData] = useState<Product>({
    shopId: shopId,
    name: "",
    price: 0,
    stockLevel: 0,
    image: "",
    category: 'Electronics',
    description: "",
  });

  const [open, setOpen] = useState(false); // State to control dialog visibility


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData(prevData => ({
        ...prevData,
        [name]: Number(value), // Convert number fields to numbers
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value, // For text, select, and other types, use the value directly
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result as string, // Assuming base64 image
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert formData to an object that matches Product type (without FormData)
    const productData: Product = {
      ...formData,
      shopId: shopId,
      price: Number(formData.price), // Ensure price is a number
      stockLevel: Number(formData.stockLevel), // Ensure stockLevel is a number
    };

    try {
      await addProduct(productData); // Pass the correctly typed product data to the service
      alert("Product added successfully");
      setOpen(false); // Close the dialog on success
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}> {/* Control dialog visibility */}
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 py-4">
            {/* Name */}
            <div className="col-span-2">
              <Label htmlFor="name" className="block mb-2">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Product Name"
                className="w-full"
              />
            </div>
            {/* Price */}
            <div>
              <Label htmlFor="price" className="block mb-2">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                type="number"
                placeholder="Product Price"
              />
            </div>
            {/* Stock Level */}
            <div>
              <Label htmlFor="stockLevel" className="block mb-2">
                Stock Level
              </Label>
              <Input
                id="stockLevel"
                name="stockLevel"
                value={formData.stockLevel}
                onChange={handleChange}
                type="number"
                placeholder="Available Stock"
              />
            </div>
            {/* Category */}
            <div>
      <Label htmlFor="category" className="block mb-2">
        Category <span className="text-red-500">*</span>
      </Label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="form-select"
        style={{ paddingLeft: '24px', paddingRight: '24px', paddingTop: '6px', paddingBottom: '6px' }}
      >
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
        <option value="Furniture">Furniture</option>
      </select>
    </div>
            {/* Description */}
            <div className="col-span-2">
              <Label htmlFor="description" className="block mb-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                className="w-full"
              />
            </div>
            {/* Image Upload */}
            <div className="col-span-2">
              <Label htmlFor="image" className="block mb-2">
                Product Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
