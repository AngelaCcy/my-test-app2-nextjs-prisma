"use client";
import { useEffect } from "react";
import { useProductsStore } from "@/app/stores/useProductStore";
import ProductList from "@/app/components/products/ProductList";
// import getCurrentUser from "@/app/utils/actions";
// import type { User } from "@prisma/client";

export default function Homepage() {
  const { products, isLoading, fetchData } = useProductsStore();
  // const [currentUser, setCurrentUser] = useState<User>({});
  // useEffect(() => {
  //   const getData = async () => {

  //     // const currtUser = await getCurrentUser();
  //     // setCurrentUser(currtUser);
  //   };
  //   getData();
  // }, [fetchData]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <main className="container mx-auto md:w-10/12 py-8 px-4">
        {isLoading ? (
          <div className="text-center text-lg">Loading...</div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
    </>
  );
}
