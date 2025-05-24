import React, { useRef, useState } from 'react'
import { PageLoader } from 'components/commons'
import i18n from 'components/commons/i18n'
import { useFetchCountries, useCreateOrder } from 'hooks/reactQuery/useCheckoutApi'
import { LeftArrow } from 'neetoicons'
import { Button, Typography } from 'neetoui'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import withTitle from 'utils/withTitle'
import Form from './Form'
import { Form as NeetoUIForm } from 'neetoui/formik'
import { CHECKOUT_FORM_INITIAL_VALUES, CHECKOUT_FORM_VALIDATION_SCHEMA } from './constants'
import useCartItemsStore from 'src/sources/useCartItemsStore'
import routes from 'routes'

const Checkout = () => {

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  const { t } = useTranslation();
  const history = useHistory();

  const timerRef = useRef(null)

  const clearCart = useCartItemsStore.pickFrom();

  const { isLoading } = useFetchCountries();
  const { mutate: createOrder } = useCreateOrder();

  const redirectToHome = () => {
    timerRef.current = setTimeout(() => {
      history.push(routes.root)
      clearCart();
    }, 1500)
  }

  const handleRedirect = () => {
    if(timerRef.current) {
      history.push(routes.root)
      clearCart();
      clearTimeout(timerRef.current)
    } else {
      history.goBack();
    }
  }

  const handleSubmit = values => {
    setIsSubmitDisabled(true)
    createOrder(
      { payload: values },
      {
        onSuccess: () => {
          redirectToHome();
        },
        onError: () => setIsSubmitDisabled(false)
      }
    )
  }

  if(isLoading) return <PageLoader />

  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: CHECKOUT_FORM_INITIAL_VALUES,
        validationSchema: CHECKOUT_FORM_VALIDATION_SCHEMA,
        onsubmit: handleSubmit,
      }}
    >
      <div className='flex space-x-4'>
        <div className="m-10 w-1/2">
          <div className="flex items-center">
            <LeftArrow
              className='hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-4'
              onClick={handleRedirect}
            />
            <Typography
              className='text-left'
              component='u'
              style="h3"
              textTransform='uppercase'
              weight='bold'
            >
              {t("checkOut")}
            </Typography>
          </div>
          <div className='mt-8 space-y-4'>
            <Form />
          </div>
        </div>
        <div className='neeto-ui-bg-gray-300 h-screen w-1/2 pt-10'>

          <div className='mt-auto flex justify-center'>
            <Button
              className='bg-neutral-800 w-1/3 justify-center'
              disabled={isSubmitDisabled}
              label={t("confirmOrder")}
              type='submit'
            />
          </div>
        </div>
      </div>
    </NeetoUIForm>
  )
}

export default withTitle(Checkout, i18n.t("ckeckout"))