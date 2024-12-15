"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Product, ProductSchema } from "@/app/utils/fake-data";

interface ProductFormProps {
  product?: Product | null;
}

const ProductFormAPI = ({ product }: ProductFormProps) => {
  // const params = useParams();
  // const id = Number(params?.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product
      ? {
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        }
      : undefined,
  });

  // if (action === 'edit') {
  //     if (!id) return <></>;
  // }

  const router = useRouter();

  const handleFormSubmit = async (data: Product) => {
    if (product) {
      try {
        await fetch(`/api/products/${product.id}`, {
          method: "PUT", // Method put is to create
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(() => {
          Swal.fire({
            title: "Success!",
            text: "The product has been updated!",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            router.push("/productsAPI");
          });
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await fetch("/api/products/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(() => {
          Swal.fire({
            title: "Success!",
            text: "The product has been created!",
            icon: "success",
            confirmButtonText: "Close",
          }).then(() => {
            router.push("/productsAPI");
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white border-4 rounded-md p-12 w-1/2 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-7 text-center">
        {product ? `Edit Product: ${product.title}` : "Create Product"}
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col items-center justify-center w-2/3"
      >
        {/* <form action={action === 'edit' ? handleUpdateSubmit : handleCreateSubmit} className='flex flex-col items-center justify-center w-2/3'> */}
        <div className="flex flex-col items-start justify-center mb-3 w-full">
          <label htmlFor="title" className="block pb-2">
            Title
          </label>
          <input
            {...register("title")}
            className="required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center mb-3 w-full">
          <label htmlFor="price" className="block pb-2">
            Price
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center mb-3 w-full">
          <label htmlFor="description" className="block pb-2">
            Description
          </label>
          <input
            {...register("description")}
            className="required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center mb-3 w-full">
          <label htmlFor="category" className="block pb-2">
            Category
          </label>
          <input
            {...register("category")}
            className="required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start justify-center mb-3 w-full">
          <label htmlFor="image" className="block pb-2">
            Image
          </label>
          <input
            {...register("image")}
            className="required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
        {isSubmitting && <p className="text-blue-500">Submitting...</p>}
      </form>
    </div>
  );
};

export default ProductFormAPI;
