import React, { useEffect, useState } from 'react'
import productsApi from 'apis/products'
import ProductListItem from './ProductListItem'
import { Header, PageLoader, PageNotFound } from "components/commons";

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const { products } = await productsApi.fetch();
      setProducts(products);
    } catch(error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  if(isLoading) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="flex flex-col">
      <Header title="Smile Cart" shouldShowBackButton={false} />
      <div className='grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4'>
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList