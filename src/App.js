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
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';

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
    path: "/orders",
    element: <Protected><UserOrderPage /></Protected>
  },
  {
    path: "/my-profile",
    element: <UserProfilePage />
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/reset-password",
    element: <ForgotPasswordPage />
  }, 
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome/></ProtectedAdmin>
  },
  {
    path: "/admin/product-details/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage/></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
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
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user]);

    return (
      <>
        <RouterProvider router={router} />
      </>
    )
  };


export default App;
