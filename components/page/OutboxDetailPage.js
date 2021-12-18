import React from "react";

import Navbar from '../components/Header/Navbar';
import Sidebar from '../components/Sidebar';
import OutboxDetail from '../content/OutboxDetail';

import requests from "../requests";
import constants from "../constants";


class OutboxDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.search_title = props.match.params.search_title;
        this.state = {
            outbox: null
        }
    }

    async UNSAFE_componentWillMount() {
        let responseData = await requests.getData(`/api/workflow/product-detail/${this.search_title}`, constants.ACCESS_TOKEN)
        this.setState({
            outbox: responseData.space
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
                            {this.state.outbox
                                ? (<OutboxDetail outbox={this.state.outbox} />)
                                : (<div><p>Không tìm thấy sản phẩm có sản phẩm</p></div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OutboxDetailPage;