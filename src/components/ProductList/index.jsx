import { filterNonNull } from 'neetocist';
import useQueryParams from 'hooks/useQueryParams';
import React, { useEffect, useState } from 'react'
import productsApi from 'apis/products'
import ProductListItem from './ProductListItem'
import { Header, PageLoader, PageNotFound } from "components/commons";
import { Input, NoData, Pagination } from 'neetoui';
import { Search } from 'neetoicons';
import { isEmpty, mergeLeft, without } from 'ramda';
import { useFetchProducts } from 'hooks/reactQuery/useProductsApi';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "./constants";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { buildUrl } from 'utils/url';
import routes from 'routes';
import useFuncDebounce from 'hooks/useFuncDebounce';

const ProductList = () => {

  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const [searchKey, setSearchKey] = useState(searchTerm);

  const history = useHistory();

  const productParams = {
    searchTerm,
    page: page || DEFAULT_PAGE_INDEX,
    pageSize: pageSize || DEFAULT_PAGE_SIZE,
  }

  const { data: { products = [], totalProductsCount } = {}, isLoading } = useFetchProducts(productParams);

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.products.index, mergeLeft({ page, pageSize: DEFAULT_PAGE_SIZE }))
    )

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null
    }
    setSearchKey(value)

    history.replace(buildUrl(routes.products.index, filterNonNull(params)))
  })

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
            onChange={({ target: { value } }) => {
              updateQueryParams(value)
              setSearchKey(value)
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
          count={totalProductsCount}
          navigate={handlePageNavigation}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
        />
      </div>
    </div>
  )
}

export default ProductList