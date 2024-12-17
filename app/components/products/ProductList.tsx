// import { auth } from "@/auth";
import ProductCard from "./ProductCard";
import { SaleProduct as Product } from "@/app/utils/fake-data";
import { getCurrentUser } from "@/app/utils/actions";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface Props {
  products: Product[];
  // currentUser: User;
}

export default function ProductList({ products }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const currtUser = await getCurrentUser();
      if (currtUser) {
        setCurrentUser(currtUser);
      }
    };
    getData();
  }, [currentUser]);

  return (
    <div className="mt-16">
      <h1 className="text-3xl font-semibold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
