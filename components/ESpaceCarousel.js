import React from 'react';
import Carousel from "react-bootstrap/Carousel";

export default function ESpaceCarousel() {

    const carouselStyle = {objectFit: "cover", minHeight : "18rem", maxHeight: "50rem"};
    return (
        <Carousel className="d-flex container">
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/cappuchino.jpg"
                    alt="GNIKE COFFEE: Cappuchino"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/soda.jpg"
                    alt="GNIKE COFFEE: Soda"
                />
                <Carousel.Caption>\
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/tra-trai-cay.jpg"
                    alt="GNIKE COFFEE: Tea"
                />
                <Carousel.Caption>\
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={carouselStyle}
                    src="/ca-phe-mix.jpg"
                    alt="GNIKE COFFEE: Cappuchino"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}