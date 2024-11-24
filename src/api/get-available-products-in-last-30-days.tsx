import { api } from "../utils/axios";

export async function getAvailableProductsInLast30Days() {
  const response = await api.get<{ amount: number }>(
    "/sellers/metrics/products/available",
  );

  return response.data;
}
