import { Link } from "react-router-dom";
import { FieldErrorMessage } from "./common/fieldErrorMessage";
import { Label } from "./common/label";
import { Select } from "./common/select";
import { Textarea } from "./common/textarea";
import { InputWithIcon } from "./common/inputWithIcon";
import { ImageUpload } from "./common/imageUpload";
import realCurrencyIcon from "../assets/icons/real-currency-orange.svg";
import { StatusTag } from "./statusTag";

type ProductFormProps = {
  product: any;
  categoriesToSelect: { label: string; value: string }[];
  isSubmitting: boolean;
  errors: any;
  register: any;
  control: any;
  handleSubmit: any;
  handleEditProduct: any;
  showStatusTag?: boolean;
};

const isDisabled = (status: string, isSubmitting: boolean) =>
  isSubmitting || ["sold", "cancelled"].includes(status);

const FormField = ({
  label,
  id,
  children,
  error,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    {children}
    {error && <FieldErrorMessage message={error} />}
  </div>
);

export function ProductForm({
  product,
  categoriesToSelect,
  isSubmitting,
  errors,
  register,
  control,
  handleSubmit,
  handleEditProduct,
  showStatusTag = true,
}: ProductFormProps) {
  const disabled = isDisabled(product.status, isSubmitting);

  return (
    <form className="flex gap-6" onSubmit={handleSubmit(handleEditProduct)}>
      <div>
        <div className="h-[340px] w-[415px]">
          <ImageUpload
            id="image"
            accept=".png"
            placeholder="Select product image"
            previewURL={product.attachments?.[0]?.url}
            disabled={disabled}
            register={register("image")}
          />
        </div>
        {errors.image && <FieldErrorMessage message={errors.image.message} />}
      </div>

      <div className="flex w-[591px] flex-col gap-6 rounded-[20px] bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="title-sm text-gray-300">Product Details</p>
          {showStatusTag && <StatusTag productStatus={product.status} />}
        </div>

        <div
          className={`flex flex-col gap-10 ${
            ["sold", "cancelled"].includes(product.status) ? "opacity-55" : ""
          }`}
        >
          <div className="flex gap-5">
            <FormField label="Title" id="title" error={errors.title?.message}>
              <InputWithIcon
                id="title"
                placeholder="Product name"
                disabled={disabled}
                {...register("title")}
              />
            </FormField>

            <FormField label="Price" id="price" error={errors.price?.message}>
              <InputWithIcon
                icon={realCurrencyIcon}
                id="price"
                placeholder="0.00"
                disabled={disabled}
                {...register("price")}
              />
            </FormField>
          </div>

          <FormField
            label="Description"
            id="description"
            error={errors.description?.message}
          >
            <Textarea
              id="description"
              rows={4}
              placeholder="Write details about the product, size, and features"
              disabled={disabled}
              register={register("description")}
            />
          </FormField>

          <FormField
            label="Category"
            id="category"
            error={errors.category?.message}
          >
            <Select
              name="category"
              options={categoriesToSelect}
              placeholder="Select"
              disabled={disabled}
              control={control}
            />
          </FormField>
        </div>

        <div className="flex h-12 gap-3">
          <Link to="/products" className="flex h-full w-full">
            <button
              className={`action-md flex w-full items-center justify-center rounded-[.625rem] border border-orange-base bg-white px-4 text-orange-base transition-colors duration-200 
                ${isSubmitting ? "cursor-not-allowed opacity-55" : "hover:border-orange-dark hover:text-orange-dark"}`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className={`action-md flex h-full w-full items-center justify-center rounded-[.625rem] bg-orange-base px-4 text-white transition-colors duration-200
              ${disabled ? "cursor-not-allowed opacity-55" : "hover:bg-orange-dark"}`}
            disabled={disabled}
          >
            {showStatusTag ? "Save and Update" : "Save and Publish"}
          </button>
        </div>
      </div>
    </form>
  );
}
