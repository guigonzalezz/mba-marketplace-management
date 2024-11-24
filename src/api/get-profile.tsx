import { api } from "../utils/axios";
import { Seller } from "./types/seller";

export async function getProfile() {
  const response = await api.get<{ seller: Seller }>("/sellers/me");

  return response.data?.seller;
}
