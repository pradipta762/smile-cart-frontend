import { OFFER_PRICE } from 'components/constants';
import { cartTotalOf } from 'components/utils';
import { useFetchCartProducts } from 'hooks/reactQuery/useProductsApi';
import React from 'react'
import { useTranslation } from 'react-i18next'
import useCartItemsStore from 'src/sources/useCartItemsStore';
import Product from './Product';
import PriceEntry from './PriceEntry';
import { Button } from 'neetoui';

const Items = ({ isSubmitDisabled }) => {

  const { t } = useTranslation();

  const slugs = useCartItemsStore(store => keys(store.cartItems), shallow)

  const { data: products = [] } = useFetchCartProducts(slugs)

  const totalCheckoutPrice = cartTotalOf(products, OFFER_PRICE)

  return (
    <div className='flex h-full flex-col p-10'>
      {products.map(product => (
        <Product key={product.slug} {...product} />
      ))}
      <div className='mt-5 w-3/4 space-y-3'>
        <PriceEntry i18nKey="subtotal" totalPrice={totalCheckoutPrice} />
        <PriceEntry i18nKey="deliveryCharges" className='text-green-700' />
        <div className='neeto-ui-border-black border-t border-dashed'>
          <PriceEntry
            i18nKey="totalPayablePrice"
            totalPrice={totalCheckoutPrice}
          />
        </div>
      </div>
      <div className='mt-auto flex justify-center'>
        <Button
          className='bg-neutral-800 w-1/3 justify-center'
          disabled={isSubmitDisabled}
          type='submit'
        />
      </div>
    </div>
  )
}

export default Items