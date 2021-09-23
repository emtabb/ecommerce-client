import Navbar from "../../components/Navbar";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import util from "../../components/util/util";
import requests from "../../components/requests";
import constants from "../../components/constants";


function RegisterPage({api, SPACE_NAME}) {

    const [numberPhone, setNumberPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rewritePassword, setRewritePassword] = useState("");
    const [location, setLocation] = useState("");
    const [loginForm, setLoginForm] = useState({});
    const [isLogin, setLogin] = useState(false);

    async function handleSignUpAccount() {
        if (password != rewritePassword) {

        }
        const requestLogin = {
            user_sso: numberPhone,
            password: password,
            location: location,
            space   : SPACE_NAME,
        }
        let responseData = await requests.postData(api.concat("/customer/register"), requestLogin, constants.ACCESS_TOKEN);
        if (responseData.message === "SUCCESS") {
            setLogin(true);
        }
    }

    useEffect(() => {

        return () => {
            setLogin(false);
            setPassword("");
            setNumberPhone("");
        };
    }, []);

    return (
        <div>
            <div>
                <Navbar/>
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <Card className="d-flex col-12 col-sm-6 justify-content-center" border="dark">
                            <Card.Header>Điền thông tin đăng ký</Card.Header>

                            <Card.Body>
                                <Card.Title>Đăng ký</Card.Title>

                                <Form>
                                    <Row className="mb-3">

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>+84</InputGroup.Text>
                                                <Form.Control onChange={(event) => {
                                                    setNumberPhone(event.target.value)
                                                }}
                                                              type="text" placeholder="..."/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                                      type="password" placeholder="..."/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                                        <Form.Control onChange={(event) => {
                                            setRewritePassword(event.target.value)
                                        }} type="password" placeholder="..."/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control onChange={(event) => {
                                            setLocation(event.target.value)
                                        }} type="text" placeholder="..."/>
                                    </Form.Group>

                                    <Button className="mr-3" variant="primary" onClick={handleSignUpAccount} type="submit">
                                        Đăng ký
                                    </Button>
                                </Form>
                                <div className="line mt-5 mb-5"></div>

                            </Card.Body>

                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const SPACE_NAME = process.env.SPACE_NAME;
    const api = process.env.ESPACE_API

    return {
        props: {
            SPACE_NAME,
            api,
        }
    }
}

export default RegisterPage;