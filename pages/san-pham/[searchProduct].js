import React from 'react';
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductView from "../../components/content/ProductView";
import Head from "next/head";

const ProductDetailPage = ({product, api, searchProduct}) => {
    return (
        <div className="bg-gray-100">
            <Head>
                <title>{product.label}</title>
                <meta name="title" content={product.label} />
                <meta name="image" content={api.concat("/blob/" + product.background)} />
                <meta name="description" content={product.description} />
                <meta property="fb:app_id" content="1132734720507826" />
                <meta property="og:type" content="article" />
                <meta property="article:publisher" content="https://facebook.com/cafebinhthanh" />
                <meta property="og:url" content={"https://gnikee.com/san-pham/".concat(searchProduct)} />
                <meta property="og:title" content={product.label} />
                <meta property="og:site_name" content={"GNIKE COFFEE: ".concat(product.label)} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={api.concat("/blob/" + product.background)} />
                <meta property="og:image:type" content="image/jpeg" />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="840" />
                <meta property="og:image:alt" content={product.description} />
            </Head>
            <div>
                <Navbar />
                <div className="container" >
                    <div className="row">
                        {product
                            ? (<ProductView product={product} api={api} />)
                            : (<div><p>Không tìm thấy sản phẩm có sản phẩm</p></div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const api = process.env.ESPACE_API;
    const spaceName = process.env.SPACE_NAME;
    const searchProduct = context.params.searchProduct;
    const product = (await axios.get(`${api}/api/loadspace/product?space=${spaceName}&search_title=${searchProduct}`)).data.space[0];
    return {
        props: {
            api,
            product,
            searchProduct : searchProduct,
        }
    }
}

export default ProductDetailPage