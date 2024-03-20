import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import OrderedProducts from "@/components/OrderedProducts";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { Product } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    orderId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  console.log(user);
  if (!user) redirect("/sign-in");
  const payload = await getPayloadClient();
  const { orderId } = params;
  const { docs: order } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });
  const products = order[0].products;
  console.log(order, "order");
  return (
    <MaxWidthWrapper>
      <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Order:{" "}
              <span className="text-2xl font-bold sm:text-3xl text-muted-foreground">
                {orderId}
              </span>
            </h1>
          </div>
        </div>
        <div className="w-full border-b border-gray-200"></div>
        <div className="relative">
          <div className="mt-6 flex items-center w-full">
            {products.length > 0 ? (
              <div className="flex h-full flex-col justify-center space-y-1 w-full gap-6">
                {products.map((item) => (
                  <OrderedProducts
                    product={item as Product}
                    key={(item as Product).id}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1 w-full">
                <div
                  aria-hidden
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    loading="eager"
                    src="/hippo-empty-cart.png"
                    fill
                    alt="empty shopping cart"
                  />
                </div>
                <h3 className="font-semibold text-2xl">
                  Your don&apos;t have any purchases
                </h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;
