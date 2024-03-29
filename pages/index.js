import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../components/Header/Navbar";
import ProductContent from "../components/content/ProductContent";
import ESpaceCarousel from "../components/ESpaceCarousel";
import cartRequest from "../components/requests/cartRequests";
import Head from "next/head";
import Footer from "../components/Footer";
import NewsContent from "../components/content/NewsContent";
import WorkTime from "../components/content/WorkTime";
import {Card} from "react-bootstrap";
import constants from "../components/constants";
import AbstractPageFacade from "../facade/AbstractPageFacade";
import Link from "next/link";
import styles from "../styles/Home.module.css";
const {ACTION_GET_CART} = constants;

export default function Home({loadspace, category, news, API, SPACE_NAME, DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {

    const api = API;
    const [productsCart, setProductsCart] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCartData = async (data) => {
        await setProductsCart(data);
        await setLoading(true);
    }
    useEffect(() => {
        let payload = {
            action: ACTION_GET_CART
        }
        handleCartData(cartRequest(payload)).then();
        return () => {
            setProductsCart([]);
            setLoading(false);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>S-Premium Coffee & Restaurant: giao tận nơi, thơm trọn từng giây.</title>
                <meta name="title" content="S-Premium Coffee & Restaurant: giao tận nơi, thơm trọn từng giây."/>
                <meta name="image" content="https://gnikee.com/background-store.jpg"/>
                <meta name="description" content="Thương hiệu cà phê Việt, giao hàng tận nơi."/>
                <meta property="og:url" content="https://gnikee.com"/>
                <meta property="fb:app_id" content="1132734720507826"/>
                <meta property="og:type" content="article"/>
                <meta property="article:publisher" content="https://facebook.com/cafebinhthanh"/>
                <meta property="og:title" content="S-Premium Coffee & Restaurant: giao tận nơi, thơm trọn từng giây."/>
                <meta property="og:site_name" content="S-Premium Coffee & Restaurant: Cà phê Việt"/>
                <meta property="og:description" content="Thương hiệu cà phê Việt, giao hàng tận nơi."/>
                <meta property="og:image" content="https://gnikee.com/background-store.jpg"/>
                <meta property="og:image:type" content="image/jpeg"/>
                <meta property="og:image:width" content="1280"/>
                <meta property="og:image:height" content="840"/>
                <meta property="og:image:alt" content=""/>
            </Head>
            <div>
                {loading
                    ? (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={productsCart.length}/>)
                    : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0} />)
                }

                <ESpaceCarousel SPACE_NAME={SPACE_NAME} DEFAULT_COLOR={DEFAULT_COLOR}/>
                <WorkTime/>
                {/* --- Products --- */}
                {loadspace.space.length !== 0 ? (
                    <div className={styles['section-wrapper']}>
                        <div className="container">
                                <h2 className="text-title mt-4"> Sản Phẩm </h2>
                                <ProductContent category={category} api={api} products={loadspace.space}
                                                DEFAULT_COLOR={DEFAULT_COLOR}
                                                setProductsCart={handleCartData}
                                                showPrice={0}
                                />
                        </div>
                    </div>) 
                    : null
                }
                {/* --- News --- */}
                {news.length !== 0 ? (
                    <div className={styles['section-wrapper']}>
                    <div className="container">
                        <h2 className='text-title'> Tin Tức </h2>
                        <NewsContent news={news.slice(0, 3)} 
                                    api={API} 
                                    DEFAULT_COLOR={DEFAULT_COLOR}/> 
                        <Link href="/tin-tuc"><a className='view-button'><span>xem tất cả</span></a></Link>
                    </div>
                    </div> ) : null
                }
            </div>
            <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                    FOOTER_CONTACT={FOOTER_CONTACT}
                    FOOTER_ADDRESS={FOOTER_ADDRESS}
            />
        </div>
    )
}

export async function getServerSideProps() {
    const serverData = AbstractPageFacade.initialEnvProperties();
    const response = await axios.get(`${serverData.API}/api/loadspace/product?space=${serverData.SPACE_NAME}&pageable=release_date,-1,1,1000`);
    console.log(response);
    const categoryResponse = await axios.get(`${serverData.API.concat(serverData.CATEGORY_REQUEST)}`);
    serverData.loadspace = response.data;
    serverData.category = categoryResponse.data.space;
    const mockNews =
        [
            {
                "_id" : "1",
                "search_title" : "KHÚC BIẾN TẤU TỪ VỊ CÀ PHÊ S-PREMIUM NGUYÊN BẢN",
                "description" : "S-Premium Restaurant vừa cho ra mắt thực đơn thức uống mới",
                "label" : "MENU THỨC UỐNG SÁNG TẠO S-PREMIUM – KHÚC BIẾN TẤU TỪ VỊ CÀ PHÊ S-PREMIUM NGUYÊN BẢN",
                "background" : "https://caferunam.com/wp-content/uploads/2019/12/cafe-gourmand--400x300.jpg",
            },
            {
                "_id" : "2",
                "search_title" : "“ĐƠM HOA KẾT TRÁI” LƯU GIỮ TINH THUẦN NÉT VIỆT",
                "description" : "Cà phê S-Premium đã chính thức cho ra mắt Bộ sưu tập quà tặng “Đơm Hoa Kết Trái”",
                "label" : "CÀFÊ S-PREMIUM RA MẮT BỘ SƯU TẬP QUÀ TẶNG TẾT CANH TÝ –“ĐƠM HOA KẾT TRÁI” LƯU GIỮ TINH THUẦN NÉT VIỆT",
                "background" : "https://images.unsplash.com/photo-1494552671665-4b5d938da5aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
            },
            {
                "_id" : "3",
                "search_title" : "TRẢI NGHIỆM",
                "description" : "Nằm trong chuỗi sự kiện “Trải Nghiệm Hương Vị Cà Phê S-Premium”",
                "label" : "SỰ KIỆN TRẢI NGHIỆM HƯƠNG VỊ CAFE TẠI QUẬN 2",
                "background" : "https://caferunam.com/wp-content/uploads/2019/09/PTAL4876-1-400x300.jpg",
            }
        ];
    serverData.news = mockNews;
    return {
        props: serverData
    }
}
