import axios from "axios";

const show = async () => {
  axios.get(
    "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2"
  );

}

const productsApi = { show }

export default productsApi