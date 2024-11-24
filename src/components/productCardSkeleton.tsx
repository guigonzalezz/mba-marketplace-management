import { Skeleton } from "./common/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex w-[331px] flex-col gap-1 rounded-[20px] border-2 border-transparent bg-white p-1">
      <Skeleton className="h-36 w-full rounded-2xl" />

      <div className="flex h-[94px] flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32 rounded-2xl" />

          <Skeleton className="h-5 w-28 rounded-2xl" />
        </div>

        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}
