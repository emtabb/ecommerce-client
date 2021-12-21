import React from 'react';
import PopulateBackgroundColor from "../facade/populate/PopulateBackgroundColor";
import { Container, Row, Col } from "react-bootstrap";

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
            <Container>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        </footer>
    );
}