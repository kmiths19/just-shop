import React from 'react';
import NavBar from '../features/navbar/Navbar';
import ProductList from '../features/product/components/ProductList'
import LoginPage from './LoginPage';

const Home = () => {
  return (
    <div>
      <NavBar>
        <ProductList />
      </NavBar>
    </div>
  )
}

export default Home