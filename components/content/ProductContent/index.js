import React, {useEffect, useState} from 'react';
import {ScrollMenu} from "react-horizontal-scrolling-menu";

// import util from "../../util/util";
import constants from "../../constants";
import cartRequest from "../../requests/cartRequests";
import ListGroup from "react-bootstrap/ListGroup";
import {Button, Card} from "react-bootstrap";
import LoadingPage from "../../LoadingPage";
import PopulateBackgroundColor from "../../../facade/populate/PopulateBackgroundColor";
import styles from "./styles.module.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
const {ACTION_ADD_TO_CART} = constants;

function ProductContent(props) {
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
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
          };
        return (
            <div className="container mt-4">
                <h2 className="text-title"> Sản Phẩm </h2>
                    <Slider {...settings} className={styles.slider}>
                    {
                        productsCategory.map(product => {
                            return (
                                    <ProductCard api={api} cartAction={handleAddProductToCart}
                                                    key={product._id}
                                                    product={product}
                                                    DEFAULT_COLOR={DEFAULT_COLOR}
                                    />
                                    )
                        })
                    }
                    </Slider>

                    <div className={styles.grid}>
                    {
                        productsCategory.map(product => {
                            return (
                                    <ProductCard api={api} cartAction={handleAddProductToCart}
                                                    key={product._id}
                                                    product={product}
                                                    DEFAULT_COLOR={DEFAULT_COLOR}
                                    />
                                    )
                        })
                    }
                    </div>
                    
            </div>
        )
    } else {
        return <LoadingPage/>
    }

}

function ProductCard(props) {
    const {cartAction, api, product, DEFAULT_COLOR} = props;

    function addProductToCard() {
        product.purchase = 1;
        if (cartAction(product).length !== 0) {
            alert("Thêm sản phẩm vô thành công");
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <img
                        src={product.background === ""
                            ? "/null.jpg"
                            : `${api}/blob/${product.background}`} alt={product.description}/>
            </div>
            <div className={styles['text-drink']}>
                <a href={"/san-pham/" + product.search_title}><h6 className='text-center'>{product.label}</h6></a>
            </div>
        </div>
    )
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
            <Card className="form-inline col-auto d-inline-block shadow" >
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



export default ProductContent;