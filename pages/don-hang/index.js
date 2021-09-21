import React, {useState, useEffect} from 'react';
import Navbar from "../../components/Navbar";
import constants from "../../components/constants";
import requests from "../../components/requests";
import OrderContent from "../../components/content/OrderContent";
import userRequest from "../../components/requests/userRequests";

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
                            user.ott === true ?  (<div className="col-12">
                                <h2><span className="badge badge-warning">Lưu ý!</span></h2>
                                <p> Quý khách chưa đăng nhập tài khoản. do đó nếu tắt trình duyệt sẽ mất hiển thị đơn hàng.
                                </p>
                                <p>Vui lòng đăng nhập hoặc đăng ký để có trải nghiệm tốt hơn.</p>
                            </div> ) : (<></>)
                        }

                        {
                            Object.keys(order).length !== 0 ? (
                                <OrderContent orders={order} api={api}/>
                            ) : (<div>Không có đơn hàng</div>)
                        }
                    </div>
                </div>
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