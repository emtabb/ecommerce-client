import React from 'react';
import PopulateBackgroundColor from "../facade/populate/PopulateBackgroundColor";
import { Container, Row, Col } from "react-bootstrap";
import { MdPlace } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { AiFillPhone } from "react-icons/ai";

export default function Footer ({DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {

    return (
        <footer className={"footer ".concat(PopulateBackgroundColor.populateFooter(DEFAULT_COLOR))} style={{height: "10rem", backgroundColor: "#303030"}}>
            {/* <div className="container">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="mb-lg-0 mb-4">

                    </div>
                    <div className="">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-center">
                            <li className="nav-item">
                                <a href="#" className="nav-link text-white-50">
                                    {FOOTER_CONTACT}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link text-white-50">
                                    {FOOTER_ADDRESS}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
            <Container style={{color: "wheat"}}>
                <Row>
                    <Col>
                        <Container>
                            <Row>
                                <Col>1 of 3</Col>
                            </Row>
                            <Row>
                                <Col>2 of 3</Col>
                            </Row>
                            <Row>
                                <Col>3 of 3</Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col>1 of 3</Col>
                            </Row>
                            <Row>
                                <Col>2 of 3</Col>
                            </Row>
                            <Row>
                                <Col>3 of 3</Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col><h5>THÔNG TIN LIÊN HỆ</h5></Col>
                            </Row>
                            <Row>
                                <Col><MdPlace></MdPlace> Văn Phòng 02 Tầng 8, Tòa Nhà Pearl Plaza, Số 561A Điện Biên Phủ, Phuờng 25, Quận Bình Thạnh, TP. Hồ Chí Minh</Col>
                            </Row>
                            <Row>
                                <Col><GoMail></GoMail> thuykhieu@hqcons.vn</Col>
                            </Row>
                            <Row>
                                <Col><AiFillPhone></AiFillPhone> 0973466970</Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}