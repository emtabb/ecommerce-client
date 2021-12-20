import React, {useEffect, useState} from 'react';
import {ScrollMenu} from "react-horizontal-scrolling-menu";

import util from "../../util/util";
import constants from "../../constants";
import cartRequest from "../../requests/cartRequests";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, Card} from "react-bootstrap";
import LoadingPage from "../../LoadingPage";
// import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";
import NewCard from "./NewCard";

const {ACTION_ADD_TO_CART} = constants;

const styleProductLabel = {
    borderBottom: "5px solid",
}

const styleProductCategoryLabel = {
    borderBottom: "5px solid",
    width: "5rem"
}
function NewIndexContent(props) {
    const {api, setProductsCart, DEFAULT_COLOR} = props;

    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        setProducts(props.products);
        setProductsCategory(props.products);
        // setDimensions(getWindowDimensions())
        //
        // function handleResize() {
        //     setDimensions(getWindowDimensions())
        // }
        //
        // window.addEventListener('resize', handleResize);
        setLoading(true);

        return () => {
            setProducts([]);
            setLoading(false);
            // window.removeEventListener('resize', handleResize);
        }
    }, []);

    function handleAddProductToCart(product) {
        let payload = {
            data: product,
            action: ACTION_ADD_TO_CART
        }
        let cart = cartRequest(payload);
        setProductsCart(cart);
        return cart;
    }

    if (loading) {
        return (
            <div className="row" style={{marginBottom: "3rem"}}>
                <div className="mt-2 col-12 col-md-12 col-lg-12">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                productsCategory.length !== 0 ? productsCategory.map(product => {
                                    return (
                                        <NewCard api={api}
                                                     key={product._id}
                                                     product={product}
                                                     DEFAULT_COLOR={DEFAULT_COLOR}
                                        />
                                    )
                                }) : (<div className="text-center"> Hiện tại chưa có tin tức </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    } else {
        return <LoadingPage/>
    }
}

export default NewIndexContent;