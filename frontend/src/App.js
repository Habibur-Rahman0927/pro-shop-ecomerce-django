import {
  HashRouter as Router,
  Route,
} from "react-router-dom";
import { Container } from 'react-bootstrap'

import Footer from "./component/Footer";
import Header from "./component/Header";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import EditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-5'>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/admin/userlist" component={UserListScreen}/>
          <Route path="/admin/user/:id" component={EditScreen}/>
          <Route path="/admin/productlist" component={ProductListScreen}/>
          <Route path="/admin/product/:id" component={ProductEditScreen}/>
          <Route path="/admin/orderlist" component={OrderListScreen}/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
