import { Skeleton } from "./common/skeleton";
import { ActionButton } from "./common/actionButton";
import { SkeletonField } from "./common/skeletonField";

export function ProductFormSkeleton() {
  return (
    <div className="flex gap-6">
      <div>
        <Skeleton className="h-[340px] w-[415px] rounded-xl" />
      </div>

      <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="title-sm text-gray-300">Product Details</p>
          <Skeleton className="h-5 w-20 rounded-xl" />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <SkeletonField
                label="Title"
                htmlFor="title"
                height="[49px]"
                width="full"
              />
              <SkeletonField
                label="Price"
                htmlFor="price"
                height="[49px]"
                width="full"
              />
            </div>

            <SkeletonField
              label="Description"
              htmlFor="description"
              height="[112px]"
              width="full"
            />
            <SkeletonField
              label="Category"
              htmlFor="category"
              height="[53px]"
              width="full"
            />
          </div>

          <div className="flex h-12 gap-3">
            <ActionButton to="/products" label="Cancel" />
            <ActionButton
              label="Save and Update"
              isPrimary={true}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
