import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({ imageUrl, name, offerPrice, slug, availableQuantity }) => (
  <Link
    to={buildUrl(routes.products.show, { slug })}
    className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4"
  >
    <img src={imageUrl} alt={name} className="h-40 w-40" />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    <AddToCart {...{ availableQuantity, slug }} />
  </Link>
);

export default ProductListItem;
