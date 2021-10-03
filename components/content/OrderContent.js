import React, {useEffect, useState} from 'react';
import util from "../util/util";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import {ScrollMenu} from "react-horizontal-scrolling-menu";

function mappingStatus(status) {
    let renderStatus = "";
    switch (status) {
        case "WAITING"  :
            renderStatus = <h5><span className="badge badge-dark text-white">Đơn hàng đang chờ xác nhận</span></h5>;
            break;
        case "APPROVED" :
            renderStatus = <h5><span className="badge badge-primary">Đơn hàng đã được chấp nhận</span></h5>;
            break;
        case "CANCELLED" :
            renderStatus = <h5><span className="badge badge-danger">Đơn hàng đã bị hủy</span></h5>;
            break;
        case "DELIVERING":
            renderStatus = <h5><span className="badge badge-info">Đơn hàng đang được giao</span></h5>;
            break;
        case "COMPLETED" :
            renderStatus = <h5><span className="badge badge-success">Đơn hàng hoàn tất</span></h5>;
            break;
        default:
            renderStatus = <h5><span className="badge badge-warning">"Lỗi hệ thống"</span></h5>;
            break;
    }
    return renderStatus;
}

export default function OrderContent(props) {

    const {orders, api} = props;

    const [ordersFilter, setOrdersFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setOrdersFilter(orders);
        return () => {
            setLoading(false);
            setOrdersFilter([]);
        };
    }, []);
    return (
        <>
            <div className="col-12 col-md-3">
                <OrderStatus orders={orders} loading={loading} setLoading={setLoading}
                             setOrdersFilter={setOrdersFilter}/>
            </div>
            {
                loading ? (<div className="col-12 col-md-6">
                    {
                        ordersFilter.map((order) => {
                            return (
                                <Card className='mb-3' key={order.outbox_code} style={{width: '100%'}}>

                                    <ListGroupItem>Trạng thái:
                                        {mappingStatus(order.status)}
                                    </ListGroupItem>
                                    {
                                        order.status === "CANCELLED" ? (
                                            <Card.Body>
                                                <Card.Title>Lý do hủy đơn hàng:</Card.Title>
                                                <Card.Text>{order.reason}</Card.Text>
                                            </Card.Body>
                                        ) : <></>
                                    }
                                    <div className="line"/>
                                    {
                                        order.group_order.map((data, idx) => {
                                            return (
                                                <div key={idx}>
                                                    <Card.Img variant="top"
                                                              style={{width: "100%", maxHeight: "20rem", objectFit: "contain"}}
                                                              src={data.background !== "" ? api.concat(`/blob/${data.background}`) : ""}/>
                                                    <Card.Body>
                                                        <Card.Title>{data.label}</Card.Title>
                                                        <Card.Text>{data.notes}</Card.Text>
                                                    </Card.Body>
                                                    <ListGroup variant="flush">
                                                        <ListGroupItem>Số lượng: {data.purchase}</ListGroupItem>
                                                        <ListGroupItem>
                                                            <strong className="btn btn-info">Giá: {util.beautyNumber(data.promotion * data.purchase)} đ
                                                            </strong>
                                                        </ListGroupItem>
                                                    </ListGroup>
                                                    <div className="line"/>
                                                </div>
                                            )
                                        })
                                    }
                                </Card>
                            )
                        })
                    }
                </div>) : (<LoadingPage/>)
            }
        </>
    )

}

function OrderStatus(props) {

    const {orders, setOrdersFilter, setLoading} = props;

    const categories = [{
        key: "WAITING",
        name: "Chờ xác nhận"
    }, {
        key: "APPROVED",
        name: "Đang làm"
    }, {
        key: "DELIVERING",
        name: "Đang giao hàng"
    }, {
        key: "COMPLETED",
        name: "Đã hoàn tất",
    }, {
        key: "CANCELLED",
        name: "Đã hủy"
    }, {
        key: "ALL",
        name: "Tất cả"
    }]

    const [status, setStatus] = useState("ALL");
    const [dimensions, setDimensions] = useState({});

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    function handleSetOrderFilter(key) {
        setStatus(key);
        if (key === "ALL") {
            setOrdersFilter(orders);
            return;
        }
        let ordersFilter = orders.filter(order => order.status === key);
        setOrdersFilter(ordersFilter);
    }

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions())
        }

        handleSetOrderFilter("WAITING");
        window.addEventListener('resize', handleResize);
        setLoading(true);
        return () => {
            window.removeEventListener('resize', handleResize);
            setStatus("ALL");
            setLoading(false);
        }
    }, []);

    if (dimensions.width < 550) {
        return (
            <div className="mb-2">
            <ScrollMenu style={{height: "auto" }}>
                {categories.map(cate => (
                    <h5 key={cate.key}>
                        <Button className={"badge badge-pill p-3 m-1 " + (cate.key === status ? "text-white" : "text-success")}
                                variant={cate.key === status ? "success" : "outline-success"}
                                onClick={() => {
                                    handleSetOrderFilter(cate.key)
                                }}
                                style={{color : "green"}}
                        > {cate.name} </Button>
                    </h5>
                ))}
            </ScrollMenu>
            </div>
        )
    } else {

        return (
            <ListGroup className="border shadow w-100">
                {
                    categories.map(cate => (
                        <ListGroup.Item key={cate.key}>
                            <Button className="w-100 flex-fill"
                                    variant={cate.key === status ? "success" : "outline-success"}
                                    onClick={() => {
                                        handleSetOrderFilter(cate.key)
                                    }}
                            > {cate.name} </Button>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        )
    }

}

