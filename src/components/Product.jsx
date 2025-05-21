import Carousel from './Carousel'
import productsApi from 'apis/products';
import { Spinner, Typography } from 'neetoui'
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { append, isNotNil } from 'ramda';

const Product = () => {
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchProduct = async () => {
    try {
      const product = await productsApi.show();
      setProduct(product)
    } catch(error) {
      console.log("An error occurred", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
  } = product;

  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  {/*Loader part */}
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return(
    <div className='px-6 pb-6'>
      <div>
        <Typography className='py-2 text-4xl font-semibold' style="h1">{name}</Typography>
        <hr className='border-2 border-black' />
      </div>
      <div className='flex gap-4 mt-6'>
        <div className='w-2/5'>
          {
            isNotNil(imageUrls) ? (
              <Carousel
                title={name}
                imageUrls={append(imageUrl, imageUrls)}
              />
            ) : (
              <img src={imageUrl} alt={name} className='w-48' />
            )
          }
        </div>
        <div className='w-3/5 space-y-4'>
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className='font-semibold'>Offer price: {offerPrice}</Typography>
          <Typography className='font-semibold text-green-600'>{discountPercentage}% off</Typography>
        </div>
      </div>
    </div>
  )
}

export default Product