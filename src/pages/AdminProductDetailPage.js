import React from 'react'
import NavBar from '../features/navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails'
import AdminProductDetails from '../features/admin/components/AdminProductDetails'

const AdminProductDetailsPage = () => {
    return (
        <div>
            <NavBar>
                <AdminProductDetails />
            </NavBar>
        </div>
    )
}

export default AdminProductDetailsPage