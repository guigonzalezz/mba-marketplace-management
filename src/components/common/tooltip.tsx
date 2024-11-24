import { TooltipProps } from "recharts";
import userMultipleIcon from "../../assets/icons/user-multiple.svg";

export const Tooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const day = date.getDate();
    const monthName = date.toLocaleString("en-US", { month: "long" });

    return (
      <div className="box-shadow flex w-[146px] flex-col gap-2 rounded-lg bg-white p-3">
        <p className="label-sm text-gray-400">{`${day} ${monthName}`}</p>

        <div className="flex items-center gap-2">
          <img
            src={userMultipleIcon}
            className="h-4 w-4"
            alt="Multiple users icon"
          />

          <p className="body-xs text-gray-300">{payload[0].value} visitors</p>
        </div>
      </div>
    );
  }

  return null;
};
