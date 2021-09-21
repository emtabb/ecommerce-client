import React, {useEffect, useState} from 'react';
import util from "../util/util";
import {Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";

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

    console.log(orders);

    return (
        <>
            <div className="col-12 col-md-3">
                <OrderStatus />
            </div>
            <div className="col-12 col-md-9">
                {
                    orders.map((order) => {
                        return (
                            <Card className='mb-3' key={order.outbox_code} style={{width: '100%'}}>

                                <ListGroupItem>Trạng thái:
                                    {mappingStatus(order.group_order[0].status)}
                                </ListGroupItem>
                                {
                                    order.group_order[0].status === "CANCELLED" ? (
                                        <Card.Body>
                                            <Card.Title>Lý do hủy đơn hàng:</Card.Title>
                                            <Card.Text>{order.group_order[0].reason}</Card.Text>
                                        </Card.Body>
                                    ) : <></>
                                }
                                <div className="line"/>
                                {
                                    order.group_order.map((data, idx) => {
                                        return (
                                            <div key={idx}>
                                                <Card.Img variant="top"
                                                          src={data.background !== "" ? api.concat(`/blob/${data.background}`) : ""}/>
                                                <Card.Body>
                                                    <Card.Title>{data.label}</Card.Title>
                                                    <Card.Text>{data.notes}</Card.Text>
                                                </Card.Body>
                                                <ListGroup variant="flush">
                                                    <ListGroupItem>Số lượng: {data.purchase}</ListGroupItem>
                                                    <ListGroupItem>Thành tiền: {util.beautyNumber(data.promotion)} đ</ListGroupItem>
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
            </div>
        </>
    )
}

function OrderStatus(props) {

    const categories = [{
        key: "ALL",
        name: "Tất cả"
    }, {
        key: "WAITING",
        name: "Đang chờ"
    }, {
        key: "APPROVED",
        name: "Đang làm"
    }, {
        key: "CANCELLED",
        name: "Đã hủy"
    }, {
        key: "COMPLETED",
        name: "Đã hoàn tất"
    }]
    const [category, setCategory] = useState("");
    const [dimensions, setDimensions] = useState({});

    function getWindowDimensions() {
        const {innerWidth: width, innerHeight: height} = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions())
        }

        setCategory("ALL");
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <ListGroup horizontal={dimensions.width < 550} className="border shadow w-100">
            {
                categories.map(cate => (
                    <ListGroup.Item key={cate.key}>
                        <Button className="w-100 flex-fill"
                                variant={cate.key === category ? "success" : "outline-success"}
                                onClick={() => {
                                    setCategory(cate.key)
                                }}
                        > {cate.name} </Button>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    )
}

