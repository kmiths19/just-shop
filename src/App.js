import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import {fetchItemsByUserIdAsync} from './features/cart/cartSlice'
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <SignupPage />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage />
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />
  },
  {
    path: "*",
    element: <PageNotFound />
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user]);

    return (
      <>
        <RouterProvider router={router} />
      </>
    )
  };


export default App;
