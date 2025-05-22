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

const App = () => {
  return (
    <>
      <Switch>
        <Route exact component={ProductList} path={routes.products.index} />
        <Route exact component={Product} path={routes.products.show} />
        <Redirect from={routes.root} to={routes.products.index} />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </>
  )
};

export default App;
