import React from 'react'
import { LeftArrow } from 'neetoicons';
import { Typography } from 'neetoui';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Header = ({ title, shouldShowBackButton = true }) => {
  const history = useHistory();

  return (
    <div className="m-2">
      <div className="flex items-center">
        {shouldShowBackButton && (
          <LeftArrow className='hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6' onClick={history.goBack} />
        )}
        <Typography style="h1" weight='semibold'>{title}</Typography>
      </div>
      <hr className='h-1 neeto-ui-bg-black' />
    </div>
  )
}

export default Header