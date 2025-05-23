import React, { useEffect, useState } from 'react'
import productsApi from 'apis/products'
import ProductListItem from './ProductListItem'
import { Header, PageLoader, PageNotFound } from "components/commons";
import { Input, NoData, Pagination } from 'neetoui';
import { Search } from 'neetoicons';
import { isEmpty, without } from 'ramda';
import useDebounce from 'hooks/useDebounce';
import { useFetchProducts } from 'hooks/reactQuery/useProductsApi';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";

const ProductList = () => {

  const [searchKey, setSearchKey] = useState("")
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_INDEX)

  const debouncedSearchKey = useDebounce(searchKey)

  const productParams = {
    searchTerm: debouncedSearchKey,
    page: currentPage,
    pageSize: DEFAULT_PAGE_SIZE,
  }

  const { data: { products = [], totalProductsCount } = {}, isLoading } = useFetchProducts(productParams);

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
            onChange={event => {
              setSearchKey(event.target.value)
              setCurrentPage(DEFAULT_PAGE_INDEX)
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className='h-full w-full' title='No products to show' />
      ) : (
        <div className='grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4'>
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
            />
          ))}
        </div>
      )}
      <div className="py-5 self-end">
        <Pagination
          navigate={page => setCurrentPage(page)}
          count={totalProductsCount}
          pageNo={currentPage || DEFAULT_PAGE_INDEX}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  )
}

export default ProductList