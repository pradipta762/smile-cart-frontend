import { Typography } from 'neetoui'
import React from 'react'
import { Trans } from 'react-i18next'

const PriceEntry = ({ totalPrice, i18nKey, className = "" }) => {
  return (
    <Typography className='flex justify-between' style="h5">
      <Trans
        {...{ i18nKey }}
        components={{ span: <span {...{ className }} /> }}
        values={{ totalPrice }}
      />
    </Typography>
  )
}

export default PriceEntry