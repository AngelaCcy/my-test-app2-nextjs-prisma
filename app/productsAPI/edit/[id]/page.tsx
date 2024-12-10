// import { useParams } from 'next/navigation'
import ProductForm from '@/app/components/ProductFormAPI';
import { getProductById } from '@/app/utils/actions';

const EditProduct = async ({params,}: {params: Promise<{ id: string }>}) => {
    // const params = useParams();
    // const id = Number(params?.id);
    const id = (await params).id

    if (!id) return <></>;

    const product = await getProductById(Number(id));

    return (
        <ProductForm product={product} />
    );

}

export default EditProduct;