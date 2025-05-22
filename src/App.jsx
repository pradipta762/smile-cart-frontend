import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Product from "./components/Product";
import ProductList from "components/ProductList";
import PageNotFound from "components/commons/PageNotFound";
import routes from "routes";
import { useState } from "react";
import CartItemsContext from "./contexts/CartItemsContext";

const App = () => {

  const [cartItems, setCartItems] = useState([])

  return (
    <>
      <CartItemsContext.Provider value={[cartItems, setCartItems]} >
        <Switch>
          <Route exact component={ProductList} path={routes.products.index} />
          <Route exact component={Product} path={routes.products.show} />
          <Redirect from={routes.root} to={routes.products.index} />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </CartItemsContext.Provider>
    </>
  )
};

export default App;
