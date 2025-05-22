import React from 'react'
import { LeftArrow } from 'neetoicons';
import { Typography } from 'neetoui';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = ({ title, shouldShowBackButton = true, actionBlock, cartItemsCount }) => {
  const history = useHistory();

  return (
    <div className="m-2">
      <div className='mx-6 mb-2 mt-6 flex items-end justify-between'>
        <div className="flex items-center">
          {shouldShowBackButton && (
            <LeftArrow className='hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6' onClick={history.goBack} />
          )}
          <Typography style="h1" weight='semibold'>{title}</Typography>
        </div>
        <div className='flex items-end space-x-4'>
          {actionBlock}
          <div>
            {
              cartItemsCount > 0 && (
                <span className='border neeto-ui-border-black neeto-ui-rounded-full min-w-fit h-5 w-5 flex items-center justify-center self-end p-1'>{cartItemsCount}</span>
              )
            }
            <AiOutlineShoppingCart size="2rem" />
          </div>
        </div>
      </div>
      <hr className='h-1 neeto-ui-bg-black' />
    </div>
  )
}

export default Header