import React, {useEffect, useState} from 'react';
import {ScrollMenu} from "react-horizontal-scrolling-menu";

import util from "../util/util";
import constants from "../constants";
import cartRequest from "../requests/cartRequests";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, Card} from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";

const {ACTION_ADD_TO_CART} = constants;

function ProductIndexContent(props) {
    const {api, category, setProductsCart, DEFAULT_COLOR} = props;

    const [products, setProducts] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
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
            <div className="row" style={{marginBottom: "3rem"}}>
                <div className="mb-2 mt-2 col-12 col-md-3 col-lg-3 container">
                    <ProductCategory categories={category} productsOrigin={products}
                                     dimensions={dimensions}
                                     setProductsCategory={setProductsCategory}
                                     DEFAULT_COLOR={DEFAULT_COLOR}
                    />
                </div>
                <div className="mt-2 col-12 col-md-8 col-lg-8">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                productsCategory.length !== 0 ? productsCategory.map(product => {
                                    return (
                                        <ProductCard api={api} cartAction={handleAddProductToCart}
                                                     key={product._id}
                                                     product={product}
                                                     DEFAULT_COLOR={DEFAULT_COLOR}
                                        />
                                    )
                                }) : (<div className="text-center"> Không có sản phẩm </div>)
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

function ProductCategory(props) {

    const {categories, productsOrigin, setProductsCategory, dimensions, DEFAULT_COLOR} = props;

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
            <Card className="form-inline fixed-top col-auto d-inline-block shadow" style={{marginTop: "5.8rem"}}>
                <ScrollMenu style={{height: "auto"}}>
                    <h3>
                        <Button
                            className={"badge badge-pill m-2 p-2 " + ("ALL" === category
                                ? "text-white"
                                : PopulateBackgroundColor.populateText(DEFAULT_COLOR))}
                            key={"ALL"}
                            variant={"ALL" === category
                                ? PopulateBackgroundColor.populateAvailableState(DEFAULT_COLOR)
                                : PopulateBackgroundColor.populateUnAvailableState(DEFAULT_COLOR)
                            }
                            onClick={() => {
                                handleOnClickMenuItem("ALL")
                            }}
                        > Tất cả </Button>
                    </h3>
                    {
                        categories.map(cate => (
                            <h3 key={cate.key}>
                                <Button
                                    className={"badge badge-pill m-2 p-2 " + (cate.key === category
                                        ? "text-white"
                                        : PopulateBackgroundColor.populateText(DEFAULT_COLOR))}
                                    variant={cate.key === category
                                        ? PopulateBackgroundColor.populateAvailableState(DEFAULT_COLOR)
                                        : PopulateBackgroundColor.populateUnAvailableState(DEFAULT_COLOR)
                                    }
                                    onClick={() => {
                                        handleOnClickMenuItem(cate.key)
                                    }}
                                    style={{color: PopulateBackgroundColor.populateColor(DEFAULT_COLOR)}}
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
                            variant={"ALL" === category
                                ? PopulateBackgroundColor.populateAvailableState(DEFAULT_COLOR)
                                : PopulateBackgroundColor.populateUnAvailableState(DEFAULT_COLOR)
                            }
                            onClick={() => {
                                handleOnClickMenuItem("ALL")
                            }}
                    > Tất cả </Button>
                </ListGroup.Item>
                {
                    categories.map(cate => (
                        <ListGroup.Item key={cate.key}>
                            <Button className="w-100 flex-fill"
                                    variant={cate.key === category
                                        ? PopulateBackgroundColor.populateAvailableState(DEFAULT_COLOR)
                                        : PopulateBackgroundColor.populateUnAvailableState(DEFAULT_COLOR)
                                    }
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
    const {cartAction, api, product, DEFAULT_COLOR} = props;

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
        width: "15rem"
    }

    let cardImageSubStyleSheet = {
        borderRadius: borderRadius,
        width: "100%",
        height: "7rem"
    }

    return (
        <div className="col-12 d-inline-block p-3 mt-2 mb-2 shadow d-flex container-fluid card float-start">
            <div className="row no-gutters">
                <div className="col-4">
                    <img className="card-img-top product-item-image"
                         src={product.background === ""
                             ? "/null.jpg"
                             : `${api}/blob/${product.background}`} alt={product.description}/>
                </div>
                <div className="col-8">
                    <div className="card-body flex-fill">
                        <a className="float-start" href={"/san-pham/" + product.search_title}><h6>{product.label}</h6>
                        </a>
                        <div className="w-100">
                            <div className="mb-2 float-end d-sm-none w-100">{util.beautyNumber(product.promotion)} đ</div>
                            <div
                                className="mb-2 float-end d-none d-sm-block w-100">Giá: {util.beautyNumber(product.promotion)} đ
                            </div>
                        </div>
                        <button className={"float-end btn btn-".concat(DEFAULT_COLOR)} onClick={addProductToCard}>Thêm giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductIndexContent;