import { useQuery } from "@tanstack/react-query";

import saleTagBlueIcon from "../../assets/icons/sale-tag-blue.svg";
import { MetricCard } from "./metricCard";
import { getSoldProductsInLast30Days } from "../../api/get-sold-products-in-last-30-days";

export function SoldProductsInLast30Days() {
  const { data: soldProducts, isLoading: isLoadingSoldProducts } = useQuery({
    queryKey: ["metrics", "sold-products-in-last-30-days"],
    queryFn: getSoldProductsInLast30Days,
  });

  return (
    <MetricCard
      icon={saleTagBlueIcon}
      amount={soldProducts?.amount}
      metric="Sold Products"
      isLoading={isLoadingSoldProducts}
    />
  );
}
