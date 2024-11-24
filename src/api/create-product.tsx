import { api } from "../utils/axios";
import { Product } from "./types/product";

export interface CreateProductBody {
  title: string;
  categoryId: string;
  description: string | null;
  priceInCents: number;
  attachmentsIds: (string | null)[];
}

export async function createProduct(
  body: CreateProductBody,
): Promise<{ product: Product }> {
  const respose = await api.post<{ product: Product }>("/products", body);

  return respose.data;
}
