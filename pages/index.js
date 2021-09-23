import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductContent from "../components/content/ProductContent";
import ESpaceCarousel from "../components/ESpaceCarousel";

export default function Home({loadspace, category, api}) {
    return (
        <div>
            <div>
                <Navbar/>
                <ESpaceCarousel />
                <div className="w-100 mt-5">
                    {loadspace.space.length !== 0 ? (
                            <ProductContent category={category} api={api} products={loadspace.space}/>
                        ) :
                        (<div className="row">
                            <p>Không có sản phẩm</p>
                        </div>)
                    }
                </div>
            </div>
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
