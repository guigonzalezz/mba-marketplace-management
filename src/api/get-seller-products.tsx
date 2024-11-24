import { api } from "../utils/axios";
import { Product } from "./types/product";

export interface GetSellerProductsQuery {
  search?: string | null;
  status?: string | null;
}

export async function getSellerProducts({
  search,
  status,
}: GetSellerProductsQuery) {
  const response = await api.get<{ products: Product[] }>("/products/me", {
    params: {
      search,
      status,
    },
  });

  return response.data?.products;
}
