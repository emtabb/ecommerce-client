import React from 'react';
import Carousel from "react-bootstrap/Carousel";

export default function ESpaceCarousel() {

    const carouselStyle = {objectFit: "contain", minHeight : "18rem", maxHeight: "50rem"};
    return (
        <Carousel className="d-flex container"  style={{marginTop: "3.25rem"}}>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/cappuchino.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/soda.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>\
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/tra-trai-cay.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>\
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/ca-phe-mix.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}