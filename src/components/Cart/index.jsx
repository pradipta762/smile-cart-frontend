import i18n from 'components/commons/i18n'
import React from 'react'
import { Header, PageLoader } from 'components/commons'
import productsApi from 'apis/products'
import { isEmpty, keys } from 'ramda'
import useCartItemsStore from 'src/sources/useCartItemsStore'
import { shallow } from 'zustand/shallow'
import { NoData } from 'neetoui'
import ProductCard from './ProductCard'
import PriceCard from './PriceCard'
import { cartTotalOf } from 'components/utils'
import { MRP, OFFER_PRICE } from 'components/constants'
import withTitle from 'utils/withTitle'
import { useTranslation } from 'react-i18next'
import { useFetchCartProducts } from 'hooks/reactQuery/useProductsApi'

const Cart = () => {
  const { t } = useTranslation();

  const slugs = useCartItemsStore(store => keys(store.cartItems))

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE)


  if(isLoading) return <PageLoader />

  if(isEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />
        <div className='h-screen flex items-center justify-center'>
          <NoData title='Your cart is empty!' />
        </div>
      </>
    )
  }

  return (
    <>
      <Header title="My Cart" />
      <div className='mt-10 flex justify-center space-x-10'>
        <div className='w-1/3 space-y-5'>
          {
            products.map(product => (
              <ProductCard key={product.slug} {...product} />
            ))
          }
        </div>
        {totalMrp > 0 && (
          <div>
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  )
}

export default withTitle(Cart, i18n.t("cart.title"));