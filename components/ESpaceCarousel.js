import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap";

const advertisement = [
    {
        key : "",
        name: "",
        value: "",
    }
]

export default function ESpaceCarousel() {

    const carouselStyle = {objectFit: "cover", minHeight: "18rem", maxHeight: "50rem"};
    return (
        <Carousel variant="dark" className="d-flex container">
            <Carousel.Item interval={2500} className="flex-fill">
                <a href="/san-pham">
                    <Card>
                        <Card.Img className="d-block w-100" style={carouselStyle}
                                  src="/cappuchino.jpg"
                                  alt="GNIKE COFFEE: Cappuchino"
                        />
                            <CarouselCaptionComponent />
                    </Card>
                </a>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <a href="/san-pham">
                    <Card>
                        <Card.Img className="d-block w-100" style={carouselStyle}
                                  src="/soda.jpg"
                                  alt="GNIKE COFFEE: Soda"
                        />
                            <CarouselCaptionComponent />
                    </Card>
                </a>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <a href="/san-pham">
                    <Card>
                        <Card.Img className="d-block w-100" style={carouselStyle}
                                  src="/tra-trai-cay.jpg"
                                  alt="GNIKE COFFEE: Tea"
                        />
                            <CarouselCaptionComponent />
                    </Card>
                </a>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <a href="/san-pham">
                    <Card>
                        <Card.Img className="d-block w-100" style={carouselStyle}
                                  src="/ca-phe-mix.jpg"
                                  alt="GNIKE COFFEE: Cappuchino"
                        />
                            <CarouselCaptionComponent />
                    </Card>
                </a>
            </Carousel.Item>
        </Carousel>
    )
}

function CarouselCaptionComponent() {
    return (
        <Card.Body className="bg-success-800" style={{padding : "0px !important"}}>
            <Card.Text>
                <span className="btn btn-warning text-black-50">FREESHIP CHO ĐƠN HÀNG TỪ 50K!</span>
                <a href="/san-pham" className="btn btn-primary float-end">Đặt ngay</a>
            </Card.Text>
        </Card.Body>
    )
}