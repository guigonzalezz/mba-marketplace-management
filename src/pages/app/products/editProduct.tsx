import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { editProduct } from "../../../api/edit-product";
import { getProductById } from "../../../api/get-product-by-id";
import { getProductCategories } from "../../../api/get-product-categories";
import { uploadAttachments } from "../../../api/upload-attachments";
import arrowLeftOrangeIcon from "../../../assets/icons/arrow-left-orange.svg";
import { centsToPrice, priceToCents } from "../../../utils/math";
import { ProductForm } from "../../../components/productForm";
import { ProductFormSkeleton } from "../../../components/productFormSkeleton";
import { ProductStatusButtons } from "../../../components/productStatusButtons/productStatusButtons";
import { ACCEPTED_IMAGE_TYPES } from "../../../utils/constants";
import { priceRegex } from "../../../utils/regex";

const editProductFormSchema = z.object({
  image: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        return Array.from(files ?? []).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        );
      },
      {
        message: "The image must be of PNG type",
      },
    ),

  title: z.string().min(1, "Enter the title"),

  price: z
    .string()
    .min(1, "Enter the price")
    .regex(priceRegex, "Invalid price format")
    .refine(
      (val) => {
        const parsedValue = val.replace(/\./g, "").replace(",", ".");
        return parseFloat(parsedValue) > 0;
      },
      { message: "The price must be greater than zero" },
    ),

  description: z
    .string()
    .min(15, "The description must have at least 15 characters"),

  category: z.string().min(1, "Select the category"),
});

export type EditProductForm = z.infer<typeof editProductFormSchema>;

export function EditProduct() {
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { data: { product } = {} } = useQuery({
    queryKey: ["get-product-by-id", id],
    queryFn: () => getProductById({ id }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<EditProductForm>({
    resolver: zodResolver(editProductFormSchema),
    values: {
      title: product?.title ?? "",
      price: product?.priceInCents ? centsToPrice(product?.priceInCents) : "",
      description: product?.description ?? "",
      category: product?.category.id ?? "",
    },
  });

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: uploadAttachments,
  });

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
  });

  const categoriesToSelect = categories?.map((category) => ({
    label: category.title,
    value: category.id,
  }));

  function handleGoBack() {
    navigate(-1);
  }

  async function handleEditProduct(data: EditProductForm) {
    try {
      let attachmentId = product?.attachments[0]?.id;

      if (data.image?.length) {
        const files = new FormData();
        files.append("files", data.image[0]);

        const uploadedImage = await uploadImage({ files });
        attachmentId = uploadedImage?.attachments[0]?.id;
      }

      if (!attachmentId) {
        throw new Error();
      }

      await editProductFn({
        id,
        title: data.title,
        categoryId: data.category,
        description: data.description,
        priceInCents: priceToCents(data.price),
        attachmentsIds: [attachmentId],
      });

      toast.success("Product successfully updated!");
    } catch (error) {
      toast.error("Error while updating.");
    }
  }

  return (
    <>
      <Helmet title="Edit Product" />

      <div className="mb-10 mt-8 flex">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleGoBack}
            className="action-md flex items-center gap-2 p-0.5 text-orange-base hover:text-orange-dark"
          >
            <img
              src={arrowLeftOrangeIcon}
              className="h-5 w-5"
              alt="Left arrow icon"
            />
            Back
          </button>

          <h2 className="title-md text-gray-500">Edit Product</h2>

          <p className="body-sm text-gray-300">
            Manage the registered product information
          </p>
        </div>

        <div className="ml-auto flex items-end pr-3">
          <ProductStatusButtons
            productId={id}
            productStatus={product?.status}
          />
        </div>
      </div>

      {product ? (
        <ProductForm
          product={product}
          categoriesToSelect={categoriesToSelect}
          isSubmitting={isSubmitting}
          errors={errors}
          register={register}
          control={control}
          handleSubmit={handleSubmit}
          handleEditProduct={handleEditProduct}
          showStatusTag={true}
        />
      ) : (
        <ProductFormSkeleton />
      )}
    </>
  );
}
