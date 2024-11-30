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
import { addShop } from "@/app/services/service";
import { Shop } from "@/data"; 

export function AddShop() {
  const [formData, setFormData] = useState<Shop>({
    name: "",
    contact: "",
    type: "General",
    logo: "",
    location: "",
    description: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value, 
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result as string, 
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const shopData: Shop = {
      ...formData,
    };

    try {
      await addShop(shopData); 
      alert("Product added successfully");
      setOpen(false); 
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {" "}
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Add Shop
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Shop</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new shop.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 py-4">
            <div>
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
            <div>
              <Label htmlFor="name" className="block mb-2">
                Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Location"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="contact" className="block mb-2">
                Contact
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                type="tel"
                placeholder="Enter phone number ..."
                // pattern="[\+]?[0-9]{1,4}?[-\s]?[0-9]{1,3}[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}" // Optional regex pattern for basic phone number validation
              />
            </div>

            <div>
              <Label htmlFor="category" className="block mb-2">
                Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="form-select"
                style={{
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "6px",
                  paddingBottom: "6px",
                }}
              >
                <option value="General">General</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Retail">Retail</option>
              </select>
            </div>

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

            <div className="col-span-2">
              <Label htmlFor="logo" className="block mb-2">
                Shop Logo
              </Label>
              <Input
                id="logo"
                name="logo"
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
