import React from "react";

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductView from '../content/ProductView';

import requests from "../requests";
import constants from "../constants";

class ProductViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.search_title = props.match.params.search_title;
        this.state = {
            product: null
        }
    }

    async UNSAFE_componentWillMount() {
        let responseData = await requests.getData(`/api/workflow/product-detail/${this.search_title}`, constants.ACCESS_TOKEN);
        this.setState({
            product: responseData.space
        })
    }

    render() {
        return (
            <div className="g-sidenav-show  bg-gray-100">
                <Sidebar />
                <div id="content">
                    <Navbar />
                    <div className="container" >
                        <div className="row">
                            {this.state.product
                                ? (<ProductView product={this.state.product} />)
                                : (<div><p>Không tìm thấy sản phẩm có sản phẩm</p></div>)

                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductViewPage;