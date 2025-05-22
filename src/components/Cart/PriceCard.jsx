import { useTranslation, Trans } from "react-i18next";
import React from 'react'
import classNames from 'classnames'
import { Typography, Button } from 'neetoui'
import { gt, keys } from 'ramda'
import useCartItemsStore from 'src/sources/useCartItemsStore'
import routes from 'routes'

const PriceCard = ({ totalMrp, totalOfferPrice }) => {

  const { t } = useTranslation();

  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = gt(totalDiscounts, 0)
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1)

  const itemsCount = useCartItemsStore(store => keys(store.cartItems).length)

  return (
    <div className='neeto-ui-rounded neeto-ui-border-black space-y-2 border p-3'>
      <Typography className={classNames("flex justify-between", {"line-through": isDiscountPresent})}>
        <Trans
          i18nKey="totalMrp"
          components={{ typography: <span /> }}
          values={{ mrp: totalMrp }}
        />
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className='flex justify-between text-green-700 gap-4'>
            <Trans
              components={{ span: <span /> }}
              i18nKey="totalDiscounts"
              values={{ discounts: totalDiscounts, discountPercentage }}
            />
          </Typography>
          <Typography className="flex justify-between">
            <Trans
              components={{ span: <span /> }}
              i18nKey="offerPrice"
              values={{ offerPrice: totalOfferPrice }}
            />
          </Typography>
          <span className='neeto-ui-text-gray-500 text-sm'>
            {t("itemCount", { count: itemsCount })}
          </span>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <Button
          className="bg-neutral-800"
          label={t("buyNow")}
          to={routes.checkout}
        />
      </div>
    </div>
  )
}

export default PriceCard