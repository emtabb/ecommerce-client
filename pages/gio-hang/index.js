import React, {useEffect, useState} from 'react';
import CartContent from "../../components/content/CartContent";
import Navbar from "../../components/Navbar";
import cartRequest from "../../components/requests/cartRequests";
import constants from "../../components/constants";
import Footer from "../../components/Footer";
import AbstractPageFacade from "../../facade/AbstractPageFacade";

const { ACTION_GET_CART } = constants;


export default function Cart({API, SPACE_NAME, DEFAULT_COLOR}) {

    const api = API;
    const space = SPACE_NAME;

    const [productsCart, setProductsCart] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCartData = (data) => {
        setProductsCart(data);
        setLoading(true);
    }
    useEffect( () => {
        let payload = {
            action: ACTION_GET_CART
        }

        handleCartData(cartRequest(payload));
        return () => {
            setProductsCart([]);
            setLoading(false);
        }
    }, []);

    return (
        <div className="bg-gray-100">
            <div>
                {loading
                    ? (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={productsCart.length}/>)
                    : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0}/>)
                }
                <div className="container">
                    <CartContent api={api} space={space} DEFAULT_COLOR={DEFAULT_COLOR} />
                </div>
                <div style={{height: "4rem"}}/>
                <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                        FOOTER_CONTACT={FOOTER_CONTACT}
                        FOOTER_ADDRESS={FOOTER_ADDRESS}
                />
            </div>
        </div>
    )

}

export async function getServerSideProps() {
    const serverData = AbstractPageFacade.initialEnvProperties();
    return {
        props: serverData
    }
}