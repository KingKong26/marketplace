"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { toast } from "sonner";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem, items } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  console.log(items);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        const exists = items.some((item) => item.product.id === product.id);
        if (exists) {
          toast.warning("Product already added to cart");
          return;
        }
        setIsSuccess(true);
        addItem(product);
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
