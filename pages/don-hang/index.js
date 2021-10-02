import React, {useState, useEffect} from 'react';
import Navbar from "../../components/Navbar";
import constants from "../../components/constants";
import requests from "../../components/requests";
import OrderContent from "../../components/content/OrderContent";
import userRequest from "../../components/requests/userRequests";
import Footer from "../../components/Footer";
import {Card} from "react-bootstrap";

function getUser() {
    let payload = {
        action: constants.ACTION_GET_USER_INFORMATION,
        data: {}
    };
    let user = userRequest(payload)
    if (user === undefined) {
        user = {};
    }
    return user;
}

export default function Order({api}) {

    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});

    async function getOrderStatus() {
        let orderStatus = await requests.getData(api.concat("/api/workflow/order/status"), constants.ACCESS_TOKEN);
        if (orderStatus.space !== undefined) {
            setOrder(orderStatus.space);
        } else {
            setOrder({});
        }
    }

    useEffect(() => {

        getOrderStatus().then().catch();
        setUser(getUser());
        return () => {
            setOrder({})
            setUser({})
        }
    }, [])

    return (
        <div className="bg-gray-100">
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row">
                        {
                            user.disabled === true ? (<div className="col-12">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Lưu ý</strong> Xin quý khách hãy <a href="/ca-nhan">đăng nhập </a>
                                    tài khoản để theo dõi đơn hàng của mình một cách tốt nhất. Xin cảm ơn quý khách!
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>) : (<></>)
                        }

                        {
                            Object.keys(order).length !== 0 ? (
                                <OrderContent orders={order} api={api}/>
                            ) : (
                                <Card className="col-xs-12 col-12 col-md-8 p-3" style={{minHeight: '18rem'}}>
                                    Hiện tại bạn chưa có đơn hàng
                                </Card>
                            )
                        }
                    </div>
                </div>
                <div style={{height: "10rem"}}/>
                <Footer/>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const api = process.env.ESPACE_API;
    return {
        props: {
            api
        }
    }
}