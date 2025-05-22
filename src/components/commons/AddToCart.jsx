import React from 'react'
import { useState, useContext } from 'react'
import { Button } from 'neetoui'
import CartItemsContext from 'src/contexts/CartItemsContext'
import { without } from 'ramda'

const AddToCart = ({ slug }) => {

  const [cartItems, setCartItems] = useContext(CartItemsContext);

  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug) ? without([slug], prevCartItems) : [slug, ...prevCartItems]
    )
  }

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size='large'
      onClick={handleClick}
    />
  )
}

export default AddToCart