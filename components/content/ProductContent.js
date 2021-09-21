import React, {useEffect, useState} from 'react';
import axios from 'axios';

import util from "../util/util";
import constants from "../constants";
import cartRequest from "../requests/cartRequests";
import ListGroup from "react-bootstrap/ListGroup";
import {Button} from "react-bootstrap";

const {ACTION_ADD_TO_CART} = constants;

function ProductContent(props) {
    const {api} = props;

    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [next, setNext] = useState("");
    const [scrolling, setScrolling] = useState(false);
    const [productsCart, setProductsCart] = useState([]);
    const [observerSpace, setObserverSpace] = useState([]);

    useEffect(() => {
        setProducts(props.products);
        setProductsCategory(props.products);
        setNext("");
        setScrolling(false);
        onInfiniteScroll().then().catch();
        return () => {
            setProducts([]);
            setScrolling(false);
            setNext("");
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

    async function onInfiniteScroll() {
        window.addEventListener('scroll', async () => {
            const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
            if (clientHeight + scrollTop >= scrollHeight - 2) {
                if (scrolling) {
                    return;
                }
                setScrolling(true)
                await handleScrollLoadSpace();
            }
        });
    }

    async function handleScrollLoadSpace() {
        if (next !== "") {
            let url = `${api}/api/loadspace/product/${next}`
            let response = await axios.get(url);
            setObserverSpace([...observerSpace, ...await response.data.space]);
            setNext(await response.data.next);
            setScrolling(false);
        }
    }

    return (
        <div className="row">
            <div className="col-12 col-md-3 col-lg-3 mt-3">
                <ProductCategory productsOrigin={products} productsCategory={productsCategory} setProductsCategory={setProductsCategory}/>
            </div>
            <div className="mt-3 col-12 col-md-8 col-lg-8">
                <div className="container-fluid">
                    <div className="row">
                        {productsCategory.map(product => {
                            return (
                                <ProductCard api={api} cartAction={handleAddProductToCart}
                                             key={product._id}
                                             product={product}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}

function ProductCategory(props) {

    const {productsOrigin, productsCategory, setProductsCategory} = props;

    const categories = [{
        key: "ALL",
        name: "Tất cả"
    }, {
        key: "COFFE",
        name: "Coffee"
    }, {
        key: "MAPPUCHINO",
        name: "Đá xay"
    }, {
        key: "CAPPUCHINO",
        name: "Cà phê ý"
    }, {
        key: "TEA",
        name: "Trà"
    }];

    function handleOnClickMenuItem(key) {
        setCategory(key);
        if (key === "ALL") {
            setProductsCategory(productsOrigin);
            return;
        }
        let productsFilter = productsCategory.filter(product => product.category === key);
        setProductsCategory(productsFilter);
    }

    const [category, setCategory] = useState("");
    const [dimensions, setDimensions] = useState({});

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions())
        }

        setCategory("ALL");
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <ListGroup horizontal={dimensions.width < 550} className="border shadow w-100">
            {
                categories.map(cate => (
                    <ListGroup.Item key={cate.key}>
                        <Button className="w-100 flex-fill"
                                variant={cate.key === category ? "success" : "outline-success"}
                                onClick={() => {
                                    handleOnClickMenuItem(cate.key)
                                }}
                        > {cate.name} </Button>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

function ProductCard(props) {
    const {cartAction, api, product} = props;

    function addProductToCard() {
        product.purchase = 1;
        if (cartAction(product).length !== 0) {
            alert("Thêm sản phẩm vô giỏ hàng thành công");
        }
    }

    let borderRadius = "0.2rem";
    let cardSubStyleSheet = {
        borderRadius: borderRadius
    }

    let cardImageSubStyleSheet = {
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        width: "100%", objectFit: "cover",
        height: "20rem"
    }

    const styleCard = {}
    return (
        <div className="col-xs-6 col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex float-left card">

            <img className="card-img-top mt-2"
                 style={cardImageSubStyleSheet}
                 src={product.background === ""
                     ? "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                     : `${api}/blob/${product.background}`} alt={product.description}/>
            <div className="card-body flex-fill">
                <a href={"/san-pham/" + product.search_title}><h6>{product.label}</h6></a>
                <p className="card-text">{product.description}</p>
                <div className="input-group text-center mb-3 w-100">
                    <div className="form-control d-sm-none">{util.beautyNumber(product.promotion)}</div>
                    <div className="form-control d-none d-sm-block">Giá: {util.beautyNumber(product.promotion)}</div>
                    <div className="input-group-append">
                        <span className="input-group-text">đ</span>
                    </div>
                </div>
                <button className="form-control btn btn-success w-100" onClick={addProductToCard}>Mua</button>
            </div>

        </div>

    )
}

export default ProductContent;