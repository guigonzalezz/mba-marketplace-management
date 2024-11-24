import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import saleTagIcon from "../../assets/icons/sale-tag.svg";
import searchIcon from "../../assets/icons/search.svg";
import { Status } from "../../api/types/product";
import { Select } from "../common/select";
import { ProductFilterSubmitButton } from "./productFilterSubmitButton";
import { ProductFilterField } from "./productFIlterField";

const productFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
});

export type ProductFiltersSchema = z.infer<typeof productFiltersSchema>;

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValues = {
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues,
  });

  const statusOptions = Object.entries(Status).map(([key, value]) => ({
    label: value,
    value: key,
  }));

  const handleApplyFilter = async ({
    search,
    status,
  }: ProductFiltersSchema) => {
    setSearchParams((prevParams) => {
      if (search) {
        prevParams.set("search", search);
      } else {
        prevParams.delete("search");
      }

      if (status) {
        prevParams.set("status", status);
      } else {
        prevParams.delete("status");
      }

      return prevParams;
    });
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-[20px] bg-white p-6">
      <h3 className="title-sm text-[var(gray-300)]">Filter</h3>

      <form
        className="flex flex-col gap-10"
        onSubmit={handleSubmit(handleApplyFilter)}
      >
        <div className="flex flex-col gap-5">
          <ProductFilterField
            id="search"
            placeholder="Search"
            icon={searchIcon}
            register={register}
          />

          <Select
            name="status"
            options={statusOptions}
            placeholder="Status"
            icon={saleTagIcon}
            control={control}
          />
        </div>

        <ProductFilterSubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
