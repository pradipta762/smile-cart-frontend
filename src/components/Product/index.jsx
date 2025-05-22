import Carousel from "./Carousel";
import productsApi from "apis/products";
import { Button, Spinner, Typography } from "neetoui";
import React, { useEffect, useState } from "react";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Header, PageLoader, PageNotFound } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import routes from "routes";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";

const Product = () => {
  const { slug } = useParams();

  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug)

  if (isError) return <PageNotFound />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;

  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(1);

  {
    /*Loader part */
  }
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel />
          ) : (
            <img src={imageUrl} alt={name} className="w-48" />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: ${mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: ${offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
