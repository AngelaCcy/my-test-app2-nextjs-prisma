"use client";
// import { auth } from "@/auth";
// import ProductCard from "./ProductCard";
import { SaleProduct as Product } from "@/app/utils/fake-data";
import { getUserFavorites } from "@/app/utils/actions";
// import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import ProductCard from "./products/ProductCard";
import { useEffect, useState } from "react";
import { useProductsStore } from "../stores/useProductStore";

interface Props {
  user?: User | null;
  // currentUser: User;
}

export default function FavoriteList({ user }: Props) {
  const { products, isLoading, fetchData } = useProductsStore();
  const [userFav, setUserFav] = useState<Product[]>([]);

  useEffect(() => {
    const getData = async () => {
      await fetchData();
      if (products) {
        const favorites = await getUserFavorites(user, products);
        setUserFav(favorites);
      }
    };
    getData();
  }, [fetchData, user, products]);

  return (
    <div className="mt-16">
      {isLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold mb-4">My Favorites</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userFav.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUser={user}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
