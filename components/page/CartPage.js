import React from 'react';
import Navbar from '../components/Header/Navbar';
import Sidebar from '../components/Sidebar';
import CartContent from '../content/CartContent';

const CartPage = () => {
    return (
        <div className="g-sidenav-show  bg-gray-100">
            <Sidebar />
            <div id="content">
                <Navbar />
                <div className="container" >
                    <CartContent />
                </div>
            </div>
        </div>
    )
}

export default CartPage;