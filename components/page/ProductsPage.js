import React from "react";

import Navbar from '../components/Header/Navbar';
import Sidebar from '../components/Sidebar';
import ProductContent from '../content/ProductContent';
import requests from "../requests";
import constants from "../constants";

// const DOMAIN = process.env.DOMAIN;

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async UNSAFE_componentWillMount() {
        console.log(constants.ACCESS_TOKEN)
        let responseData = await requests.getData(`/api/loadspace/product?pageable=release_date,-1,1,10`, constants.ACCESS_TOKEN);
        if (responseData.space) {
            this.setState({
                products: responseData.space
            })
        }
    }

    render() {
        return (
            <div className="g-sidenav-show  bg-gray-100">
                <Sidebar />
                <div id="content">
                    <Navbar />
                    <div className="container" >
                            {this.state.products.length !== 0 ? (
                                <ProductContent products={this.state.products} />
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
}

export default ProductsPage;