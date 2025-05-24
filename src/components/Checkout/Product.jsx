import { Tag } from 'neetoui';
import React from 'react'
import useCartItemsStore from 'src/sources/useCartItemsStore'

const Product = ({ name, imageUrl, offerPrice, slug }) => {
  const { [slug]: selectedQuantity } = useCartItemsStore();

  return (
    <div className='mt-3 flex'>
      <div className='neeto-ui-rounded neeto-ui-border-gray-500 relative border'>
        <img
          src={imageUrl}
          alt={name}
          height={60}
          width={60}
          className='neeto-ui-rounded'
        />
        <div className='absolute right-0 top-0 -mr-mt-2'>
          <Tag className='w-2' label={selectedQuantity} type='solid' />
        </div>
      </div>
      <div className="m-5 flex w-1/2 justify-between">
        <Typography style="h5" weight="semibold">
          {name}
        </Typography>
        <Typography style="h5">${offerPrice}</Typography>
      </div>
    </div>
  )
}

export default Product