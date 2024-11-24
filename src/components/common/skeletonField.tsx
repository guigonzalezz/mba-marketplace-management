import { Label } from "./label";
import { Skeleton } from "./skeleton";

export const SkeletonField = ({
  label,
  htmlFor,
  height,
  width,
}: {
  label: string;
  htmlFor: string;
  height: string;
  width: string;
}) => (
  <div>
    <Label htmlFor={htmlFor}>{label}</Label>
    <Skeleton className={`h-${height} w-${width} rounded-xl`} />
  </div>
);
