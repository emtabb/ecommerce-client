import React, {useEffect, useState} from 'react';
import {ScrollMenu} from "react-horizontal-scrolling-menu";

import util from "../util/util";
import constants from "../constants";
import cartRequest from "../requests/cartRequests";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, Card} from "react-bootstrap";
import LoadingPage from "../LoadingPage";

const {ACTION_ADD_TO_CART} = constants;

function ProductContent(props) {
    const {api, category} = props;

    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [productsCart, setProductsCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dimensions, setDimensions] = useState({});

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
        setDimensions(getWindowDimensions())

        function handleResize() {
            setDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize);
        setLoading(true);

        return () => {
            setProducts([]);
            setLoading(false);
            window.removeEventListener('resize', handleResize);
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
            <div className="row mt-4" style={{marginBottom: "3rem"}}>
                <div className="mt-2 mb-2 col-12 col-md-3 col-lg-3 container">
                    <ProductCategory categories={category} productsOrigin={products}
                                     dimensions={dimensions}
                                     setProductsCategory={setProductsCategory}/>
                </div>
                <div className="mt-2 col-12 col-md-8 col-lg-8">
                    <ScrollMenu style={{height: "auto"}}>
                        {
                            productsCategory.length !== 0 ? productsCategory.map(product => {
                                return (
                                    <ProductCard api={api} cartAction={handleAddProductToCart}
                                                 key={product._id}
                                                 product={product}/>
                                )
                            }) : (<div className="text-center"> Không có sản phẩm </div>)
                        }
                    </ScrollMenu>
                </div>
            </div>
        )
    } else {
        return <LoadingPage/>
    }

}

function ProductCategory(props) {

    const {categories, productsOrigin, setProductsCategory, dimensions} = props;

    function handleOnClickMenuItem(key) {
        setCategory(key);
        if (key === "ALL") {
            setProductsCategory(productsOrigin);
            return;
        }
        let productsFilter = productsOrigin.filter(product => product.category === key);
        setProductsCategory(productsFilter);
    }

    const [category, setCategory] = useState("");

    useEffect(() => {
        setCategory("ALL");
        return () => {
            setCategory("");
        }
    }, []);

    if (dimensions.width < 450) {
        return (
            <Card className="form-inline col-auto d-inline-block shadow" >
                <ScrollMenu style={{height: "auto"}}>
                    <h3>
                        <Button
                            className={"badge badge-pill m-2 p-2 " + ("ALL" === category ? "text-white" : "text-success")}
                            key={"ALL"}
                            variant={"ALL" === category ? "success" : "outline-success"}
                            onClick={() => {
                                handleOnClickMenuItem("ALL")
                            }}
                        > Tất cả </Button>
                    </h3>
                    {
                        categories.map(cate => (
                            <h3 key={cate.key}>
                                <Button
                                    className={"badge badge-pill m-2 p-2 " + (cate.key === category ? "text-white" : "text-success")}
                                    variant={cate.key === category ? "success" : "outline-success"}
                                    onClick={() => {
                                        handleOnClickMenuItem(cate.key)
                                    }}
                                    style={{color: "green"}}
                                > {cate.value}
                                </Button>
                            </h3>
                        ))
                    }
                </ScrollMenu>
            </Card>
        )
    } else {
        return (
            <ListGroup className="border shadow w-100">
                <ListGroup.Item>
                    <Button className="w-100 flex-fill"
                            variant={"ALL" === category ? "success" : "outline-success"}
                            onClick={() => {
                                handleOnClickMenuItem("ALL")
                            }}
                    > Tất cả </Button>
                </ListGroup.Item>
                {
                    categories.map(cate => (
                        <ListGroup.Item key={cate.key}>
                            <Button className="w-100 flex-fill"
                                    variant={cate.key === category ? "success" : "outline-success"}
                                    onClick={() => {
                                        handleOnClickMenuItem(cate.key)
                                    }}
                            > {cate.value} </Button>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        )
    }
}

function ProductCard(props) {
    const {cartAction, api, product} = props;

    function addProductToCard() {
        product.purchase = 1;
        if (cartAction(product).length !== 0) {
            alert("Thêm sản phẩm vô giỏ hàng thành công");
        }
    }

    let borderRadius = "0.5rem";
    let cardSubStyleSheet = {
        borderRadius: borderRadius,
        height: "25rem",
        width: "18rem"
    }

    let cardImageSubStyleSheet = {
        borderRadius: borderRadius,
        width: "100%", objectFit: "cover",
        height: "12rem",
    }

    return (
        <div className="d-inline-block d-flex mr-3 ml-3 card"
            style={cardSubStyleSheet}
        >
            <img className="card-img-top"
                 style={cardImageSubStyleSheet}
                 src={product.background === ""
                     ? "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                     : `${api}/blob/${product.background}`} alt={product.description}/>
            <div className="card-body flex-fill">
                <a href={"/san-pham/" + product.search_title}><h6>{product.label}</h6></a>
            </div>
            <div className="card-footer">
                <div className="text-center mb-2 w-100">
                    <div className="form-control d-sm-none w-100">{util.beautyNumber(product.promotion)} đ</div>
                    <div className="form-control d-none d-sm-block">Giá: {util.beautyNumber(product.promotion)} đ</div>
                </div>
                <button className="form-control btn btn-success w-100" onClick={addProductToCard}>Mua</button>
            </div>
        </div>
    )
}

export default ProductContent;