import { api } from "../utils/axios";
import { Category } from "./types/category";

export async function getProductCategories() {
  const response = await api.get<{ categories: Category[] }>("/categories");

  return response.data?.categories;
}
