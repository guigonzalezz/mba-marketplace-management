import { useQuery } from "@tanstack/react-query";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import calendarIcon from "../../assets/icons/calendar.svg";
import { getViewsPerDayInLast30Days } from "../../api/get-views-per-day-in-last-30-days";
import Spinner from "../common/sppiner";
import { Tooltip as CustomTooltip } from "../common/tooltip";

export function ViewsPerDayChart() {
  const { data: viewsPerDay, isLoading: isLoadingViewsPerDay } = useQuery({
    queryKey: ["metrics", "get-views-per-day-in-last-30-days"],
    queryFn: getViewsPerDayInLast30Days,
  });

  function dateFormatter(date: Date): string {
    const day = date.getDate();
    const monthName = date.toLocaleString("en-US", { month: "long" });
    return `${day} ${monthName}`;
  }

  const currentDate = new Date();
  const dateThirtyDaysAgo = new Date();
  dateThirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const formattedCurrentDate = dateFormatter(currentDate);
  const formattedDateThirtyDaysAgo = dateFormatter(dateThirtyDaysAgo);

  return (
    <div className="flex h-full flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="title-sm text-gray-500">Visitors</h2>

        <div className="flex items-center justify-center gap-2">
          <img src={calendarIcon} className="h-4 w-4" alt="Calendar icon" />

          <span className="label-sm text-gray-300">
            {formattedDateThirtyDaysAgo} - {formattedCurrentDate}
          </span>
        </div>
      </div>

      {isLoadingViewsPerDay ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={viewsPerDay} style={{ fontSize: 12 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              stroke="#949494"
              dataKey="date"
              tickFormatter={(dateString: string) =>
                new Date(dateString).getDate().toString()
              }
              axisLine={false}
              tickLine={false}
              dy={18}
            />
            <YAxis
              stroke="#949494"
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              stroke="#5EC5FD"
              type="natural"
              strokeWidth={2}
              dataKey="amount"
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
