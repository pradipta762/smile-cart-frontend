import React from 'react'
import { useState, useContext } from 'react'
import { Button } from 'neetoui'
import { without } from 'ramda'
import useCartItemsStore from 'src/sources/useCartItemsStore'
import { shallow } from "zustand/shallowd"

const AddToCart = ({ slug }) => {

  const { isInCart, toggleIsInCart } = useCartItemsStore(store => ({
    isInCart: store.cartItems.includes(slug),
    toggleIsInCart: store.toggleIsInCart,
  }), shallow);

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleIsInCart(slug);
  }

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size='large'
      onClick={handleClick}
    />
  )
}

export default AddToCart