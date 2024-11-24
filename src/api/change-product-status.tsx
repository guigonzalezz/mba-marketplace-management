import { api } from "../utils/axios";
import { Product, Status } from "./types/product";

export interface ChangeProductStatusParams {
  id: string;
  status: keyof typeof Status;
}

export async function changeProductStatus({
  id,
  status,
}: ChangeProductStatusParams): Promise<{ product: Product }> {
  const respose = await api.patch<{ product: Product }>(
    `/products/${id}/${status}`,
  );

  return respose.data;
}
