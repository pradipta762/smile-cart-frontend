import { Typography } from 'neetoui'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import routes from 'routes'
import { buildUrl } from 'utils/url'

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link to={buildUrl(routes.products.show, {slug})} className='border neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between p-4'>
    <img src={imageUrl} alt={name} className='w-40 h-40' />
    <Typography className='text-center' weight="semibold">{name}</Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
)

export default ProductListItem