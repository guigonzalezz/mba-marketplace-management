import { api } from "../utils/axios";

export async function getViewsPerDayInLast30Days() {
  const response = await api.get<{
    viewsPerDay: {
      date: Date;
      amount: number;
    }[];
  }>("/sellers/metrics/views/days");

  return response.data?.viewsPerDay;
}
