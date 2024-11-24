import { api } from "../utils/axios";
import { Product } from "./types/product";

export interface GetProductByIdResponse {
  product: Product;
}

export async function getProductById({ id }: { id: string }) {
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`);

  return response.data;
}
