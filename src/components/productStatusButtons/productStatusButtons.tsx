import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import tickIcon from "../../assets/icons/tick.svg";
import unavailableIcon from "../../assets/icons/unavailable.svg";
import { Status } from "../../api/types/product";
import {
  changeProductStatus,
  ChangeProductStatusParams,
} from "../../api/change-product-status";
import { queryClient } from "../../utils/react-query";
import { GetProductByIdResponse } from "../../api/get-product-by-id";
import { Skeleton } from "../common/skeleton";
import { ProductStatusButton } from "./productStatusButton";

interface ProductStatusButtonsProps {
  productId: string;
  productStatus: keyof typeof Status | undefined;
}

const getActionButtons = (
  productStatus: keyof typeof Status | undefined,
  productId: string,
  isChangingProductStatus: boolean,
  handleChangeProductStatus: (
    params: ChangeProductStatusParams,
  ) => Promise<void>,
) => {
  if (!productStatus) {
    return (
      <>
        <Skeleton className="h-6 w-[170px] rounded-xl" />
        <Skeleton className="h-6 w-[170px] rounded-xl" />
      </>
    );
  }

  const actions: Record<
    keyof typeof Status,
    { label: string; icon: string; onClick?: () => void; disabled: boolean }[]
  > = {
    available: [
      {
        label: "Mark as sold",
        icon: tickIcon,
        onClick: () =>
          handleChangeProductStatus({ id: productId, status: "sold" }),
        disabled: isChangingProductStatus,
      },
      {
        label: "Disable listing",
        icon: unavailableIcon,
        onClick: () =>
          handleChangeProductStatus({ id: productId, status: "cancelled" }),
        disabled: isChangingProductStatus,
      },
    ],
    sold: [
      {
        label: "Mark as available",
        icon: tickIcon,
        onClick: () =>
          handleChangeProductStatus({ id: productId, status: "available" }),
        disabled: isChangingProductStatus,
      },
      {
        label: "Product sold",
        icon: unavailableIcon,
        disabled: true,
      },
    ],
    cancelled: [
      {
        label: "Reactivate product",
        icon: tickIcon,
        onClick: () =>
          handleChangeProductStatus({ id: productId, status: "available" }),
        disabled: isChangingProductStatus,
      },
      {
        label: "Product disabled",
        icon: unavailableIcon,
        disabled: true,
      },
    ],
  };

  return actions[productStatus].map(({ label, icon, onClick, disabled }) => (
    <ProductStatusButton
      key={label}
      label={label}
      icon={icon}
      onClick={onClick}
      disabled={disabled}
    />
  ));
};

export function ProductStatusButtons({
  productId,
  productStatus,
}: ProductStatusButtonsProps) {
  const {
    mutateAsync: changeProductStatusFn,
    isPending: isChangingProductStatus,
  } = useMutation({
    mutationFn: changeProductStatus,
    onSuccess(_, { id, status }) {
      const cached = queryClient.getQueryData<GetProductByIdResponse>([
        "get-product-by-id",
        id,
      ]);

      if (cached) {
        queryClient.setQueryData<GetProductByIdResponse>(
          ["get-product-by-id", id],
          {
            product: { ...cached.product, status },
          },
        );
      }
    },
  });

  async function handleChangeProductStatus({
    id,
    status,
  }: ChangeProductStatusParams) {
    try {
      await changeProductStatusFn({ id, status });
      toast.success("Product status successfully updated!");
    } catch (error) {
      toast.error("Error updating product status.");
    }
  }

  const actionButtons = getActionButtons(
    productStatus,
    productId,
    isChangingProductStatus,
    handleChangeProductStatus,
  );

  return <div className="flex gap-4 text-orange-base">{actionButtons}</div>;
}
