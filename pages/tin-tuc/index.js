import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "../../components/Header/Navbar";
import ProductIndexContent from "../../components/content/ProductIndexContent";
import Head from "next/head";
import Footer from "../../components/Footer";
import {Card} from "react-bootstrap";
import cartRequest from "../../components/requests/cartRequests";
import constants from "../../components/constants";
import AbstractPageFacade from "../../facade/AbstractPageFacade";
import NewIndexContent from "../../components/content/news/NewIndexContent";
import styles from "./styles.module.css";
import NewsContent from "../../components/content/NewsContent";

import homeStyles from "../../styles/Home.module.css";

const {ACTION_GET_CART} = constants;

function NewsDetail() {
    return (
        <div className={styles['news-detail']}>
            <p>Càfê S-Premium có các công thức pha trộn khác nhau – tuỳ thuộc vào tỉ lệ tương ứng giữa hạt Arabica, Robusta và cách rang, xay để tạo nên sự đa dạng trong phong cách và mùi vị Cà phê Việt. Tất cả các loại Càfê RuNam đều được đóng gói 250 gr để thuận tiện cho khách hàng trong việc sử dụng hoặc làm quà tặng. Giá trị của từng gói Càfê RuNam không chỉ gói gọn trong chất lượng mà còn được bộc lộ qua ý tưởng thể hiện văn hoá uống Cà phê Việt trên bao bì được tạo nên bởi hoạ sĩ Nguyễn Thành Phong và Sandrine Llouquet.</p>            
        </div>
    )
}

export default function ProductPage({loadspace, category, API, DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {
    const api = API;
    const news = loadspace.space
    const [productsCart, setProductsCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleCartData = (data) => {
        setProductsCart(data);
        setLoading(true);
    }
    useEffect(() => {
        let payload = {
            action: ACTION_GET_CART
        }

        handleCartData(cartRequest(payload));
        setLoading(true);
        return () => {
            setProductsCart([]);
            setLoading(false);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>GNIKE COFFEE: giao tận nơi, thơm trọn từng giây.</title>
                <meta name="title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây."/>
                <meta name="image" content="https://gnikee.com/background-store.jpg"/>
                <meta name="description" content="Thương hiệu cà phê Việt, giao hàng tận nơi."/>
                <meta property="og:url" content="https://gnikee.com"/>
                <meta property="fb:app_id" content="1132734720507826"/>
                <meta property="og:type" content="article"/>
                <meta property="article:publisher" content="https://facebook.com/cafebinhthanh"/>
                <meta property="og:title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây."/>
                <meta property="og:site_name" content="GNIKE COFFEE: Cà phê Việt"/>
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
                    : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0}/>)
                }
                
                <div className={homeStyles['section-wrapper']}>
                    <div className="container">
                        <NewsDetail/>
                        {news && news.length !== 0 ? (
                            <NewsContent news={news} api={API} DEFAULT_COLOR={DEFAULT_COLOR}/>  ) : null
                        }
                    </div>
                </div>
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
    const response = await axios.get(`${serverData.API}/api/news?space=${serverData.SPACE_NAME}&pageable=release_date,-1,1,1000`);
    const categoryResponse = await axios.get(`${serverData.API.concat(serverData.CATEGORY_REQUEST)}`);
    const mockNews =
        {
            "space" : [
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
            ]
        };
        
    serverData.loadspace = mockNews;
    serverData.category = categoryResponse.data.space;

    return {
        props: serverData
    }
}
