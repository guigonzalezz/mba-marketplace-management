import { api } from "../utils/axios";

export async function getSoldProductsInLast30Days() {
  const response = await api.get<{ amount: number }>(
    "/sellers/metrics/products/sold",
  );

  return response.data;
}
