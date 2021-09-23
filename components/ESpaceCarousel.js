import React from 'react';
import Carousel from "react-bootstrap/Carousel";

export default function ESpaceCarousel() {
    return (
        <Carousel className="d-flex">
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={{objectFit : "contain", minHeight : "15rem"}}
                    src="https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.6435-9/125182942_125967289312097_961942755027561550_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=eLR6QLFi2CwAX9j3ymG&_nc_ht=scontent.fsgn5-3.fna&oh=239f51327711841e46fec42a12cc2d8c&oe=6162E7E8"
                    alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={{objectFit : "contain", minHeight : "15rem"}}
                    src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.6435-9/125255689_125965559312270_2743846999737904176_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=VxxQcTy1E98AX-vV625&_nc_ht=scontent.fsgn5-2.fna&oh=e1d66055ff692d4bc1624714233a39e2&oe=6163AC9D"
                    alt="Second slide"
                />
                <Carousel.Caption>\
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2500} className="flex-fill">
                <img
                    className="d-block w-100" style={{objectFit : "contain", minHeight : "15rem"}}
                    src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/125217555_125960485979444_8358060065526049482_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=H3RY-MGDN-EAX8l4q9v&_nc_ht=scontent.fsgn5-6.fna&oh=f6e0d5ee86d5c51eea314fe42d186020&oe=6165377C"
                    alt="Third slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}