import React from 'react';
import axios from "axios";
import Navbar from "../../components/Navbar";
import ProductView from "../../components/content/ProductView";

const ProductDetailPage = ({product, api}) => {
    return (
        <div className="bg-gray-100">
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
            product
        }
    }
}

export default ProductDetailPage