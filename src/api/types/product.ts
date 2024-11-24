import { Attachment } from "./attachment";
import { Category } from "./category";
import { Seller } from "./seller";

export enum Status {
  available = "Avaliable",
  sold = "Sold",
  cancelled = "Disabled",
}

export type Product = {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
  status: keyof typeof Status;
  owner: Seller;
  category: Category;
  attachments: Attachment[];
};
