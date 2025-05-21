import React, { useEffect, useState } from 'react'
import productsApi from 'apis/products'
import ProductListItem from './ProductListItem'
import { Header, PageLoader, PageNotFound } from "components/commons";
import { Input, NoData } from 'neetoui';
import { Search } from 'neetoicons';
import { isEmpty } from 'ramda';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [searchKey, setSearchKey] = useState("")

  const fetchProducts = async () => {
    try {
      const data = await productsApi.fetch({ searchTerm: searchKey });
      setProducts(data.products);
      console.log(products)
    } catch(error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [searchKey])

  if(isLoading) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="Smile Cart"
        shouldShowBackButton={false}
        actionBlock={
          <Input
            placeholder='Search products'
            prefix={<Search />}
            type='search'
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className='h-full w-full' title='No products to show' />
      ) : (
        <div className='grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList