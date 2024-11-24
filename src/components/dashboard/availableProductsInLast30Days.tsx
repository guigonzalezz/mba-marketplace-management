import { useQuery } from "@tanstack/react-query";

import storeIcon from "../../assets/icons/store.svg";
import { MetricCard } from "./metricCard";
import { getAvailableProductsInLast30Days } from "../../api/get-available-products-in-last-30-days";

export function AvailableProductsInLast30Days() {
  const { data: availableProducts, isLoading: isLoadingAvailableProducts } =
    useQuery({
      queryKey: ["metrics", "available-products-in-last-30-days"],
      queryFn: getAvailableProductsInLast30Days,
    });

  return (
    <MetricCard
      icon={storeIcon}
      amount={availableProducts?.amount}
      metric="Listed Products"
      isLoading={isLoadingAvailableProducts}
    />
  );
}
