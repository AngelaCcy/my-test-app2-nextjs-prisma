import ProductForm from "@/app/components/ProductFormAction";
import { getProductById } from "@/app/utils/actions";

const EditProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const product = await getProductById(Number(id));

  return <ProductForm product={product} />;
};

export default EditProduct;
