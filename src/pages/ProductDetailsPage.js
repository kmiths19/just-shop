import React from 'react'
import NavBar from '../features/navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails'

const ProductDetailsPage = () => {
    return (
        <div>
            <NavBar>
                <ProductDetails />
            </NavBar>
        </div>
    )
}

export default ProductDetailsPage