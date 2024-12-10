"use client";

import { useRouter } from 'next/navigation'
import { createProduct, updateProductById } from '@/app/utils/actions';
import Swal from 'sweetalert2';
import { Product } from '@prisma/client';
import { ProductSchema } from '../utils/fake-data';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
    product?: Product | null;
}

const ProductFormAction = ({product}: ProductFormProps) => {
    const router = useRouter();
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

    const handleFormSubmit = async (data: Product) => {
        if (product) {
            try {
                await updateProductById(product.id, data).then(()=>{
                Swal.fire({
                    title: 'Success!',
                    text: 'The product has been updated!',
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    router.push('/productsAction');
                    })
                })
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await createProduct(data).then(()=>{
                    Swal.fire({
                        title: 'Success!',
                        text: 'The product has been created!',
                        icon: 'success',
                        confirmButtonText: 'Close'
                    }).then(() => {
                        router.push('/productsAction');
                    })
                })
            } catch (error) {
              console.error(error);
            }
        }
    };

    return (
        <div className='bg-white border-4 rounded-md p-12 w-1/2 flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-7 text-center'>{product ? `Edit Product: ${product.title}` : 'Create Product'}</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col items-center justify-center w-2/3'>
            {/* <form action={action === 'edit' ? handleUpdateSubmit : handleCreateSubmit} className='flex flex-col items-center justify-center w-2/3'> */}
                <div className='flex flex-col items-start justify-center mb-3 w-full'>
                    <label htmlFor="title" className='block pb-2'>Title</label>
                    <input {...register('title')} className='required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full' />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                </div>
                <div className='flex flex-col items-start justify-center mb-3 w-full'>
                    <label htmlFor="price" className='block pb-2'>Price</label>
                    <input {...register('price', { valueAsNumber: true })} className='required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full' />
                </div>
                <div className='flex flex-col items-start justify-center mb-3 w-full'>
                    <label htmlFor="description" className='block pb-2'>Description</label>
                    <input {...register('description')} className='required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full' />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                </div>
                <div className='flex flex-col items-start justify-center mb-3 w-full'>
                    <label htmlFor="category" className='block pb-2'>Category</label>
                    <input {...register('category')} className='required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full' />
                    {errors.category && <p className='text-red-500'>{errors.category.message}</p>}
                </div>
                <div className='flex flex-col items-start justify-center mb-3 w-full'>
                    <label htmlFor="image" className='block pb-2'>Image</label>
                    <input {...register('image')} className='required border-2 rounded-md p-1 border-pink-300 bg-pink-100 w-full' />
                    {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                </div>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md' disabled={isSubmitting}> {isSubmitting ? 'Submitting...' : 'Submit'}</button>
            </form>            
        </div>
        
    );
}

export default ProductFormAction;