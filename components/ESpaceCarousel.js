import React, {useState, useEffect} from 'react';
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import requests from './requests';
import constants from './constants';
import LoadingPage from "./LoadingPage";
import PopulateBackgroundColor from "../facade/populate/PopulateBackgroundColor";

const advertisementAPI = "/api/advertisement";
const mockData = [{
    "_id" : "_1",
    "redirect" : "/",
    "background" : "/gnikecoffee.jpeg",
    "alt" : "Cà-phê-nguyên-chất",
    "value" : "Khuyễn mãi 100%"
}]
async function loadAdvertisements(SPACE_NAME, func) {
    // const api = advertisementAPI.concat(`/get?space=${SPACE_NAME}`);
    // let response = await requests.getData(api, constants.ACCESS_TOKEN);
    func(mockData);
}

export default function ESpaceCarousel({DEFAULT_COLOR, SPACE_NAME}) {

    const [loading, setLoading] = useState(false);
    const [advertisements, setAdvertisements] = useState([]);

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
            <Carousel variant="dark" className="d-flex container">
                {
                    advertisements.map(ad => {
                        return (
                            <Carousel.Item key={ad._id} interval={2500} className="flex-fill">
                                <a href={ad.redirect}>
                                    <Card>
                                        <Card.Img className="d-block w-100 espaceCarousel"
                                                  src={ad.background}
                                                  alt={ad.name}
                                        />
                                        <CarouselCaptionComponent DEFAULT_COLOR={DEFAULT_COLOR} content={ad.value} />
                                    </Card>
                                </a>
                            </Carousel.Item>
                        )
                    })
                }
            {/*    <Carousel.Item interval={2500} className="flex-fill">*/}
            {/*        <a href="/san-pham">*/}
            {/*            <Card>*/}
            {/*                <Card.Img className="d-block w-100 espaceCarousel"*/}
            {/*                          src="/cappuchino.jpg"*/}
            {/*                          alt="GNIKE COFFEE: Cappuchino"*/}
            {/*                />*/}
            {/*                <CarouselCaptionComponent content={"Khuyến mãi 50% khi mua mang về"} />*/}
            {/*            </Card>*/}
            {/*        </a>*/}
            {/*    </Carousel.Item>*/}
            {/*    <Carousel.Item interval={2500} className="flex-fill">*/}
            {/*        <a href="/san-pham">*/}
            {/*            <Card>*/}
            {/*                <Card.Img className="d-block w-100 espaceCarousel"*/}
            {/*                          src="/soda.jpg"*/}
            {/*                          alt="GNIKE COFFEE: Soda"*/}
            {/*                />*/}
            {/*                <CarouselCaptionComponent />*/}
            {/*            </Card>*/}
            {/*        </a>*/}
            {/*    </Carousel.Item>*/}
            {/*    <Carousel.Item interval={2500} className="flex-fill">*/}
            {/*        <a href="/san-pham">*/}
            {/*            <Card>*/}
            {/*                <Card.Img className="d-block w-100 espaceCarousel"*/}
            {/*                          src="/tra-trai-cay.jpg"*/}
            {/*                          alt="GNIKE COFFEE: Tea"*/}
            {/*                />*/}
            {/*                <CarouselCaptionComponent />*/}
            {/*            </Card>*/}
            {/*        </a>*/}
            {/*    </Carousel.Item>*/}
            {/*    <Carousel.Item interval={2500} className="flex-fill">*/}
            {/*        <a href="/san-pham">*/}
            {/*            <Card>*/}
            {/*                <Card.Img className="d-block w-100 espaceCarousel"*/}
            {/*                          src="/ca-phe-mix.jpg"*/}
            {/*                          alt="GNIKE COFFEE: Cappuchino"*/}
            {/*                />*/}
            {/*                <CarouselCaptionComponent />*/}
            {/*            </Card>*/}
            {/*        </a>*/}
            {/*    </Carousel.Item>*/}
            </Carousel>
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