import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { createProduct } from "../../../api/create-product";
import { getProductCategories } from "../../../api/get-product-categories";
import { uploadAttachments } from "../../../api/upload-attachments";
import { ProductForm } from "../../../components/productForm";
import { priceToCents } from "../../../utils/math";
import { ACCEPTED_IMAGE_TYPES } from "../../../utils/constants";
import { priceRegex } from "../../../utils/regex";

const addProductFormSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((files) => files && files.length > 0, {
      message: "The image is required",
    })
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

export type AddProductForm = z.infer<typeof addProductFormSchema>;

export function AddProduct() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddProductForm>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      category: "",
    },
  });

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: uploadAttachments,
  });

  const { mutateAsync: addProduct } = useMutation({
    mutationFn: createProduct,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["product-categories"],
    queryFn: getProductCategories,
  });

  const categoriesToSelect = categories?.map((category) => ({
    label: category.title,
    value: category.id,
  }));

  async function handleAddProduct(data: AddProductForm) {
    try {
      const hasImage = data.image?.length;

      if (!hasImage) {
        throw new Error();
      }

      const files = new FormData();
      files.append("files", data.image[0]);

      const uploadedImage = await uploadImage({ files });
      const attachmentId = uploadedImage?.attachments[0]?.id;

      const response = await addProduct({
        title: data.title,
        categoryId: data.category,
        description: data.description,
        priceInCents: priceToCents(data.price),
        attachmentsIds: [attachmentId],
      });

      toast.success("Product successfully created!", {
        action: {
          label: "View product",
          onClick: () => navigate(`/products/edit/${response.product.id}`),
        },
      });
    } catch (error) {
      toast.error("Error while creating product.");
    }
  }

  return (
    <>
      <Helmet title="Add Product" />

      <div className="mb-10 mt-16 flex flex-col gap-2">
        <h2 className="title-md text-gray-500">New Product</h2>

        <p className="body-sm text-gray-300">
          Register a product for sale in the Marketplace
        </p>
      </div>

      <ProductForm
        product={{}}
        categoriesToSelect={categoriesToSelect}
        isSubmitting={isSubmitting}
        errors={errors}
        register={register}
        control={control}
        handleSubmit={handleSubmit}
        handleEditProduct={handleAddProduct}
        showStatusTag={false}
      />
    </>
  );
}
