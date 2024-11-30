import {  Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shop } from "@/types/data";
import Image from "next/image";
import Link from "next/link";

type ExtendedCardProps = React.ComponentProps<typeof Card> & {
  shop: Shop;
};

export function ProductCard({ shop, className, ...props }: ExtendedCardProps) {
  console.log({ shop });
  return (
    <Card className={cn("w-[380px] bg-white shadow-lg", className)} {...props}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Image
            src={shop?.logo?.startsWith("/") ? shop.logo : "file.svg"}
            alt={`${shop?.name} Logo`}
            width={50}
            height={50}
            className="rounded-md"
          />
          <div>
            <CardTitle className="text-lg font-bold">{shop?.name}</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {shop?.type.toUpperCase()}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm">{shop?.description}</p>
        <div className="text-sm">
          <p>
            <span className="font-bold">Location:</span> {shop?.location}
          </p>
          <p>
            <span className="font-bold">Contact:</span> {shop?.contact}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={{
            pathname: "/product",
            query: {
              shopId: shop?.id,
              shopName: shop?.name, 
            },
          }}
          passHref
        >
          <Button
            variant="default"
            className="w-full flex items-center justify-center space-x-2"
          >
            <Check /> <span>View Products</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
