import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import { Product, ProductFile } from "@/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const OrderedProducts = ({ product }: { product: Product }) => {
  const { image } = product.images[0];
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;
  const downloadUrl = (product.product_files as ProductFile).url as string;
  console.log(downloadUrl);
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>
            <div className="mt-4 text-xs text-muted-foreground">
              {product.id ? (
                <a
                  href={downloadUrl}
                  download={product.name}
                  className="text-blue-600 hover:underline underline-offset-2 font-semibold"
                >
                  Download asset
                </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderedProducts;
