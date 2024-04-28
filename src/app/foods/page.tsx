import { configProductDataLimit } from "@root/config";
import { getAllProducts } from "@root/lib/product-handler";
import { SProductSection } from "@src/components/compound";
import { SLoading } from "@src/components/root";
import { IFoodPage } from "@src/types/app/foods";
import { IGetAllProductsReturn } from "@src/types/lib/product-handler";
import { Suspense } from "react";

export default async function ProductsPage({ searchParams }: IFoodPage) {
  const currentPage: string = searchParams?.page || "1";
  const searchInput: string = searchParams?.search || "";
  const requestForGetAllProduct: Promise<IGetAllProductsReturn> =
    getAllProducts({
      currentPage: currentPage,
      dataLimit: configProductDataLimit,
      searchInput,
    });
  return (
    <section>
      <Suspense fallback={<SLoading text="Food page loading...." />}>
        <SProductSection requestForGetAllProduct={requestForGetAllProduct} />
      </Suspense>
    </section>
  );
}