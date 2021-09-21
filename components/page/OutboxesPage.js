import React from "react";

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import OutboxContent from "../content/OutboxContent";
// import axios from 'axios';
import requests from "../requests";
import constants from "../constants";
const SPACE_NAME = "baotranstore";

class OutboxesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outboxesHeader: [],
            outboxes: []
        }
    }

    async UNSAFE_componentWillMount() {
        let responseHeader = await requests.getData(`/api/workflow/model?step=STORE_OWNER_APPROVE_REQUEST&space=${SPACE_NAME}`, constants.ACCESS_TOKEN);
        if (responseHeader.message !== "Missing Authorization Header") {
            this.setState({
                outboxesHeader: responseHeader.space.sort( (state1, state2) => state1.order - state2.order)
            });
        }
        let responseOutboxes = await requests.getData(`/api/workflow/step?step=STORE_OWNER_APPROVE_REQUEST&space=${SPACE_NAME}`, constants.ACCESS_TOKEN)
        if (responseOutboxes.message !== "Missing Authorization Header") {
            this.setState({
                outboxes: responseOutboxes.space
            })
        }
    }

    render() {
        return (
            <div className="g-sidenav-show bg-gray-100">
                <Sidebar />
                <div id="content">
                    <Navbar />
                    <div className="container-fluid" >
                        <div className="row">
                            <h2>Danh sách đơn hàng (*Lưu ý : Không hỗ trở trên điện thoại)</h2>
                            <table className="table table-bordered col-12">
                                <thead>
                                    <tr>
                                        {
                                            this.state.outboxesHeader.length === 0 ? (
                                                <th>Không có quyền xem</th>
                                            ):(
                                                this.state.outboxesHeader.map(field => {
                                                    if (!field.hidden && field.key !== "_id") {
                                                        return (<th key={field.key}>{field.label}</th>)
                                                    }
                                                })
                                                
                                            )
                                        }
                                        <th>Chức năng</th>
                                    </tr>
                                </thead>
                                <tbody id="outbox_render">
                                    {this.state.outboxes.length !== 0 
                                    ? (
                                        <OutboxContent space_name={SPACE_NAME} outboxes={this.state.outboxes} outboxesHeader={this.state.outboxesHeader} />
                                    ) :
                                    (
                                    <tr>
                                        <td>
                                            <p>Không có sản phẩm</p>
                                        </td>
                                    </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                            <div className="col-12 col-md-8">
                                <button className="btn btn-outline-primary float-left" id="prePageOutbox">Previous</button>

                                <button className="btn btn-outline-primary float-right" id="nextPageOutbox">Next</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OutboxesPage;