import Image from "next/image";

import { useCartStore } from "../../stores/useCartStore";

import { SaleProduct as Product } from "@/app/utils/fake-data";
import HeartButton from "../HeartButton";
import { User } from "@prisma/client";

interface Props {
  product: Product;
  currentUser?: User | null;
}

export default function ProductCard({ product, currentUser }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="hover:-animate-bounce-y bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl flex flex-col justify-between p-4 relative">
      <HeartButton productId={String(product.id)} currentUser={currentUser} />
      <Image
        src={product.images[0]}
        alt={product.title}
        width={100}
        height={100}
        className="object-contain w-full h-40"
      />
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
        <p className="text-gray-600 flex-1 line-clamp-4">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-gray-800 font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            className="ml-2 bg-red-300 text-white font-semibold py-2 px-4 rounded hover:bg-red-400"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
