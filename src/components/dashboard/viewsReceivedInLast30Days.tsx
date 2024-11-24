import { useQuery } from "@tanstack/react-query";

import userMultipleIcon from "../../assets/icons/user-multiple.svg";
import { MetricCard } from "./metricCard";
import { getViewsReceivedInLast30Days } from "../../api/views-received-in-last-30-days";

export function ViewsReceivedInLast30Days() {
  const { data: viewsReceived, isLoading: isLoadingViewsReceived } = useQuery({
    queryKey: ["metrics", "views-received-in-last-30-days"],
    queryFn: getViewsReceivedInLast30Days,
  });

  return (
    <MetricCard
      icon={userMultipleIcon}
      amount={viewsReceived?.amount}
      metric="Visitors"
      isLoading={isLoadingViewsReceived}
    />
  );
}
