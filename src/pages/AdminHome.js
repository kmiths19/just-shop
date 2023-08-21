import React from 'react';
import NavBar from '../features/navbar/Navbar';
import LoginPage from './LoginPage';
import AdminProductList from '../features/admin/components/AdminProductList';

const AdminHome = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList />
      </NavBar>
    </div>
  )
}

export default AdminHome