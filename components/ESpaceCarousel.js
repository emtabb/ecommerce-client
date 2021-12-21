import React, {useState, useEffect} from 'react';
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import requests from './requests';
import constants from './constants';
import LoadingPage from "./LoadingPage";
import PopulateBackgroundColor from "../facade/populate/PopulateBackgroundColor";
import styled from 'styled-components';

const advertisementAPI = "/api/advertisement";

const ThemedCarousels = styled(Carousel)`
    background-color: black;
`;

export default function ESpaceCarousel({DEFAULT_COLOR, SPACE_NAME}) {

    const [loading, setLoading] = useState(false);
    const [advertisements, setAdvertisements] = useState([]);

    const mockAdvertisement = [
        {
            "_id" : "1",
            "redirect" : "/",
            "bgImage": "/images/IMG_9933.jpg",
            "alt" : "Ảnh Bìa 1",
            "value" : "Khuyễn mãi 100%"
        },
        {
            "_id" : "2",
            "redirect" : "/",
            "bgImage": "/images/IMG_9918.jpg",
            "alt" : "Ảnh Gift Tết",
            "value" : "Khuyễn mãi 100%"
        },
        {
            "_id" : "3",
            "redirect" : "/",
            "bgImage": "/images/IMG_9864.jpg",
            "alt" : "Ảnh Gift Tết",
            "value" : "Khuyễn mãi 100%"
        }
        
    ];

    async function loadAdvertisements(SPACE_NAME, func) {
        // const api = advertisementAPI.concat(`/get?space=${SPACE_NAME}`);
        // let response = await requests.getData(api, constants.ACCESS_TOKEN);
        func(mockAdvertisement);
    }

    useEffect(() => {
        loadAdvertisements(SPACE_NAME, setAdvertisements).then(result => {
            setLoading(true)
        });
        return () => {
            setAdvertisements([])
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <>
                <ThemedCarousels fade={true}>
                    {mockAdvertisement.map( ad => {
                        return (
                            <Carousel.Item interval={2500} key={ad._id}>
                                <img
                                    className="d-block w-100"
                                    src={ad.bgImage}
                                    alt={ad.alt}
                                />
                            </Carousel.Item>
                        )
                    })}
                </ThemedCarousels>
            </>
        )
    } else {
        return <LoadingPage />
    }
}

function CarouselCaptionComponent({content, DEFAULT_COLOR}) {
    return (
        <Card.Body className={PopulateBackgroundColor.populateBackground(DEFAULT_COLOR)} style={{padding : "0px !important"}}>
            <Card.Text>
                <span className="w-100 btn btn-warning text-black-50">{content}</span>
                <a href="/san-pham" className="btn btn-primary float-end mt-2">Đặt ngay</a>
            </Card.Text>
        </Card.Body>
    )
}