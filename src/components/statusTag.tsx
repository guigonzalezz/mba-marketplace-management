import { Status } from "../api/types/product";
import { Tag } from "./tag";

interface StatusTagProps {
  productStatus: keyof typeof Status;
}

const getTagColor = (
  status: keyof typeof Status,
): "blueDark" | "success" | "gray300" | "gray400" => {
  switch (status) {
    case "available":
      return "blueDark";
    case "sold":
      return "success";
    default:
      return "gray300";
  }
};

export function StatusTag({ productStatus }: StatusTagProps) {
  const tagColor = getTagColor(productStatus);

  return <Tag color={tagColor}>{Status[productStatus]}</Tag>;
}
