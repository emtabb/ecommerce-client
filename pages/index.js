import React, {useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductContent from "../components/content/ProductContent";
import ESpaceCarousel from "../components/ESpaceCarousel";
import Head from "next/head";
import Footer from "../components/Footer";

export default function Home({loadspace, category, api}) {
    return (
        <div>
            <Head>
                <title>GNIKE COFFEE: giao tận nơi, thơm trọn từng giây.</title>
                <meta name="title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây." />
                <meta name="image" content="https://gnikee.com/background-store.jpg" />
                <meta name="description" content="Thương hiệu cà phê Việt, giao hàng tận nơi." />
                <meta property="og:url" content="https://gnikee.com" />
                <meta property="fb:app_id" content="1132734720507826" />
                <meta property="og:type" content="article" />
                <meta property="article:publisher" content="https://facebook.com/cafebinhthanh" />
                <meta property="og:title" content="GNIKE COFFEE: giao tận nơi, thơm trọn từng giây." />
                <meta property="og:site_name" content="GNIKE COFFEE: Cà phê Việt" />
                <meta property="og:description" content="Thương hiệu cà phê Việt, giao hàng tận nơi." />
                <meta property="og:image" content="https://gnikee.com/background-store.jpg" />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="840" />
                <meta property="og:image:alt" content="" />
            </Head>
            <div>
                <Navbar/>
                <ESpaceCarousel />

                <div className="container">
                    {loadspace.space.length !== 0 ? (
                            <ProductContent category={category} api={api} products={loadspace.space}/>
                        ) :
                        (<div className="container">
                            <p>Không có sản phẩm</p>
                        </div>)
                    }
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export async function getServerSideProps() {
    const SPACE_NAME = process.env.SPACE_NAME;
    const api = process.env.ESPACE_API;
    const categoryRequest = process.env.CATEGORY_REQUEST;
    const response = await axios.get(`${api}/api/loadspace/product?space=${SPACE_NAME}`);
    const categoryResponse = await axios.get(`${api.concat(categoryRequest)}`);
    const loadspace = response.data;
    const category = categoryResponse.data.space;

    return {
        props: {
            loadspace,
            api,
            category,
        }
    }
}
