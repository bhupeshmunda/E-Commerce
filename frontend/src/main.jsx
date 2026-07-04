import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createRoutesFromElements} from "react-router"
import { createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.js'

// Private route
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'

// Auth
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

// Admin
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'

import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Orders/Shipping.jsx'
import PlaceOrder from './pages/Orders/PlaceOrder.jsx'
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
import Order from './pages/Orders/Order.jsx'
import UserOrder from './pages/User/UserOrder.jsx'
import OrderList from './pages/Admin/OrderList.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route index={true} path='/' element={<Home/>}></Route> 
      <Route path='/favorite' element={<Favorites/>}></Route>
      <Route path='/product/:id' element={<ProductDetails/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>
      <Route path='/user-orders' element={<UserOrder/>}></Route>

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/shipping' element={<Shipping/>}></Route>
        <Route path='/placeorder' element={<PlaceOrder/>}></Route>
        <Route path='/order/:id' element={<Order/>}></Route>
      </Route>
      {/* Admin Routes */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='dashboard' element={<AdminDashboard/>}></Route>
        <Route path='userlist' element={<UserList/>}></Route>
        <Route path='categorylist' element={<CategoryList/>}></Route>
        <Route path='productlist' element={<ProductList/>}></Route>
        <Route path='allproductslist' element={<AllProducts/>}></Route>
        <Route path='product/update/:_id' element={<ProductUpdate/>}></Route>
        <Route path='orderlist' element={<OrderList/>}></Route>
      </Route>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router}/>
    </PayPalScriptProvider>
  </Provider>
)
