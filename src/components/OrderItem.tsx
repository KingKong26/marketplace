import { Media, Product } from "@/payload-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC",
};

const OrderItem = ({
  id,
  products,
  created,
}: {
  id: string;
  products: Product[];
  created: string;
}) => {
  const firstProduct = products[0];
  console.log(firstProduct.images);
  const media: Media = firstProduct.images[0].image as Media;
  const thumbnail = media?.url;
  console.log("thumbnail", thumbnail);
  const date: string = new Date(created).toLocaleDateString("en-US", options);
  return (
    <Link href={"/purchases/" + id} className="flex p-2">
      <div className="flex gap-3">
        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
          <Image
            src={thumbnail!}
            alt="order"
            className="absolute object-cover w-auto"
            fill
          />
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 ">
            <h4 className="line-clamp-1 text-sm font-normal mb-1">Order Id:</h4>
            <p className="line-clamp-1 text-sm font-medium mb-1 text-muted-foreground">
              {id}
            </p>
          </div>
          <div className="flex gap-2 ">
            <h4 className="line-clamp-1 text-sm font-normal mb-1">Created:</h4>
            <p className="line-clamp-1 text-sm font-medium mb-1 text-muted-foreground">
              {date}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
