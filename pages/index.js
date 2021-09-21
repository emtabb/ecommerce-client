import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductContent from "../components/content/ProductContent";
import ESpaceCarousel from "../components/ESpaceCarousel";

export default function Home({loadspace, api}) {
    return (
        <div>
            <div>
                <Navbar/>
                <ESpaceCarousel />
                <div className="container-fluid mt-5">
                    {loadspace.space.length !== 0 ? (
                            <ProductContent api={api} products={loadspace.space}/>
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

export async function getStaticProps() {
    const SPACE_NAME = process.env.SPACE_NAME;
    const api = process.env.ESPACE_API
    const response = await axios.get(`${api}/api/loadspace/product?space=${SPACE_NAME}&pageable=_id,-1,1,20`);
    const loadspace = response.data;
    return {
        props: {
            loadspace,
            api,
        }
    }
}
