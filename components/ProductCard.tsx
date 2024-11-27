import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shop } from "@/data";


type ExtendedCardProps = React.ComponentProps<typeof Card> & {
    shop: Shop; // Add shop as a required prop
  };
  

export function ProductCard({shop, className, ...props }:  ExtendedCardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{shop?.name}</CardTitle>
        <CardDescription>{shop?.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> View Products
        </Button>
      </CardFooter>
    </Card>
  )
}
