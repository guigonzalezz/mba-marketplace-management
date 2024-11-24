import { api } from "../utils/axios";
import { Product } from "./types/product";

export interface EditProductBody {
  id: string;
  title: string;
  categoryId: string;
  description: string | null;
  priceInCents: number;
  attachmentsIds: (string | null)[];
}

export async function editProduct({
  id,
  ...body
}: EditProductBody): Promise<{ product: Product }> {
  const respose = await api.put<{ product: Product }>(`/products/${id}`, body);

  return respose.data;
}
