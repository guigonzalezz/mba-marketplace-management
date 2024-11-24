import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";

import { getSellerProducts } from "../../../api/get-seller-products";
import { ProductCard } from "../../../components/productCard";
import { ProductFilters } from "../../../components/productFilter/productFilters";
import { ProductCardSkeleton } from "../../../components/productCardSkeleton";

export function Products() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const status = searchParams.get("status");

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["seller-products", search, status],
    queryFn: () => getSellerProducts({ search, status }),
  });

  return (
    <>
      <Helmet title="Products" />

      <div className="mb-10 mt-16 flex flex-col gap-2">
        <h2 className="title-md text-gray-500">Your Products</h2>

        <p className="body-sm text-gray-300">
          Access and manage your list of products for sale
        </p>
      </div>

      <div className="flex gap-6">
        <div className="h-[306px] w-[327px]">
          <ProductFilters />
        </div>

        <div className="flex w-[679px] flex-wrap gap-4">
          {isLoadingProducts
            ? Array.from({ length: 4 }).map((_, index) => {
                return (
                  <ProductCardSkeleton key={`product-card-skeleton_${index}`} />
                );
              })
            : products?.map((product) => {
                return (
                  <Link to={`/products/edit/${product.id}`} key={product.id}>
                    <ProductCard {...product} />
                  </Link>
                );
              })}
        </div>
      </div>
    </>
  );
}
