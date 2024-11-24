import { api } from "../utils/axios";

export async function getViewsReceivedInLast30Days() {
  const response = await api.get<{ amount: number }>("/sellers/metrics/views");

  return response.data;
}
