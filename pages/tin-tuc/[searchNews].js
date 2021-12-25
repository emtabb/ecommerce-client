import React from 'react';
import axios from "axios";
import Navbar from "../../components/Header/Navbar";
import ProductView from "../../components/content/ProductView";
import Head from "next/head";
import AbstractPageFacade from "../../facade/AbstractPageFacade";
import NewsDetailContent from "../../components/content/news/NewsDetailContent";
import Footer from '../../components/Footer';
const NewsDetailPage = ({news, API, searchNews, FOOTER_CONTACT, FOOTER_ADDRESS}) => {
    const api = API;
    return (
        <div className="bg-gray-100">
            <Head>
                <title>{news.label}</title>
                <meta name="title" content={news.label} />
                <meta name="image" content={api.concat("/blob/" + news.background)} />
                <meta name="description" content={news.description} />
                <meta property="fb:app_id" content="1132734720507826" />
                <meta property="og:type" content="article" />
                <meta property="article:publisher" content="https://facebook.com/cafebinhthanh" />
                <meta property="og:url" content={"https://gnikee.com/san-pham/".concat(searchNews)} />
                <meta property="og:title" content={news.label} />
                <meta property="og:site_name" content={"GNIKE COFFEE: ".concat(news.label)} />
                <meta property="og:description" content={news.description} />
                <meta property="og:image" content={api.concat("/blob/" + news.background)} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="840" />
                <meta property="og:image:alt" content={news.description} />
            </Head>
            <div>
                <Navbar />
                <div className="container" style={{marginTop: "100px"}}>
                    <div className="row">
                        {news
                            ? (<NewsDetailContent news={news} api={api} />)
                            : (<div><p>Lỗi khi tải tin tức</p></div>)
                        }
                    </div>
                </div>
                <Footer
                    FOOTER_CONTACT={FOOTER_CONTACT}
                    FOOTER_ADDRESS={FOOTER_ADDRESS}
            />
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const serverData = AbstractPageFacade.initialEnvProperties();
    serverData.searchNews = context.params.searchNews;
    // serverData.product = (await axios.get(`${serverData.API}/api/news/mono?space=${serverData.SPACE_NAME}&search_title=${serverData.searchProduct}`)).data.space[0];
    
    const mockNews = {
        "_id" : "123321",
        "product_code" : "caphe",
        "author" : "TuanNguyen",
        "label" : "MENU THỨC UỐNG SÁNG TẠO S-PREMIUM – KHÚC BIẾN TẤU TỪ VỊ CÀ PHÊ S-PREMIUM NGUYÊN BẢN",
        "search_title" : "MENU THỨC UỐNG SÁNG TẠO S-PREMIUM – KHÚC BIẾN TẤU TỪ VỊ CÀ PHÊ S-PREMIUM NGUYÊN BẢN",
        "description" : "S-Premium Restaurant vừa cho ra mắt thực đơn thức uống mới.",
        "brand" : "S-Premium",
        "background" : "https://caferunam.com/wp-content/uploads/2019/12/cafe-gourmand--400x300.jpg",
        "features" : {
            "content" : ["Menu thức uống mới của S-Premium Restaurant được sáng tạo dựa trên hương vị cà phê S-Premium đậm đà, quen thuộc. Mang đến cho khách hàng những phong vị mới mẻ, hiện đại, thực đơn thức uống mới của S-Premium Restaurant là sự kết hợp của các cung bậc hương vị, từ tươi mát, sảng khoái đến nồng ấm, béo thơm.", "Vẫn đậm đà và quyến rũ hương vị cà phê S-Premium đặc trưng, qua công thức sáng tạo độc quyền của đội ngũ RuNam, Cà phê lại trở nên ngọt ngào, thơm ngọt, tuy quen nhưng cũng vô cùng lạ lẫm. Thơm béo và mới lạ, Cà Phê Bọt Sữa hay Cà Phê Sữa Dừa là thức uống hoàn hảo cho ngày mới."]
        },
        "count" : 10,
        "rating" : 10,
        "hashtag" : "S-Premium",
        "category" : "TIN_TUC_MOI",
        "establish" : new Date().toString(),
        "type" : "type",
        "release_date" : new Date().toString(),
        "disabled": false }
    serverData.news = mockNews;

    return {
        props: serverData
    }
}

export default NewsDetailPage