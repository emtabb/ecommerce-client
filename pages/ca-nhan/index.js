import React, {useState, useEffect} from 'react';
import requests from "../../components/requests";
import constants from "../../components/constants";
import userRequests from "../../components/requests/userRequests";
import Navbar from "../../components/Navbar";
import {Button, Card, Col, Form, Row, InputGroup} from "react-bootstrap";
import userRequest from "../../components/requests/userRequests";
import util from "../../components/util/util";

function getUser() {
    let payload = {
        action: constants.ACTION_GET_USER_INFORMATION,
        data: {}
    };
    let user = userRequest(payload)
    if (user === undefined) {
        user = {};
    }
    return user;
}

export default function PersonalInformation({api, SPACE_NAME}) {

    const [userInformation, setUserInformation] = useState({});
    const [numberPhoneLogin, setNumberPhoneLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [loginForm, setLoginForm] = useState({});
    const [isLogin, setLogin] = useState(false);

    async function handleLoadUserInformation() {
        let user = getUser();
        if (util.notEmptyObject(user)) {
            if (user.ott) {
                setLogin(false);
            }
            setUserInformation(user);
        }

        if (isLogin) {
            let responseData = await requests.getData(`${api}/api/user/information`, constants.ACCESS_TOKEN);
            if (responseData.message !== "NOT FOUND") {
                setLogin(true);
                setUserInformation(responseData.message);
            } else {
                setLogin(false);
            }
        }

        let payload = {
            action: constants.ACTION_SET_USER_INFORMATION,
            data: userInformation
        }
        userRequests(payload)
    }

    async function handleSignInAccount() {
        const requestLogin = {
            username: numberPhoneLogin,
            password: passwordLogin,
        }
        let responseData = await requests.postData(api.concat("/verify/login"), requestLogin, constants.ACCESS_TOKEN);
        if (responseData.message === "SUCCESS") {

            setLogin(true);
        }
    }

    useEffect(() => {
        handleLoadUserInformation().then().catch();

        return () => {
            setUserInformation({});
            setLogin(false);
            setPasswordLogin("");
            setNumberPhoneLogin("");
        };
    }, []);


    if (!isLogin && userInformation.ott) {
        /*
            This case is user have a One Time Token but no Login.
        */
        return (
            <div>
                <div>
                    <Navbar/>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <Card className="d-flex col-12 justify-content-center w-50" border="dark">
                                <Card.Header>Thông tin cá nhân</Card.Header>
                                <Card.Body>
                                    <Card.Title>Hello</Card.Title>
                                    <Card.Text>

                                    </Card.Text>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Anh/ chị</Form.Label>
                                                <Form.Control type="input" placeholder="..."/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text>+84</InputGroup.Text>
                                                    <Form.Control value={userInformation.user_sso}
                                                                  placeholder="..."/>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control placeholder="..."/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Đăng ký với thông tin trên
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (isLogin) {
        /*
            Case update information
        */
        return (
            <div>
                <div>
                    <Navbar/>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <Card className="d-flex col-12 justify-content-center w-50" border="dark">
                                <Card.Header>Thông tin cá nhân</Card.Header>

                                <Card.Body>
                                    <Card.Title>Cập nhật thông tin cá nhân</Card.Title>
                                    <Card.Text>

                                    </Card.Text>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label>Anh/ chị</Form.Label>
                                                <Form.Control value={userInformation.name} type="input"
                                                              placeholder="..."/>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text>+84</InputGroup.Text>
                                                    <Form.Control value={userInformation.user_sso} placeholder="..."/>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control value={userInformation.location} placeholder="..."/>
                                        </Form.Group>

                                        {/*<Row className="mb-3">*/}
                                        {/*    <Form.Group as={Col} controlId="formGridCity">*/}
                                        {/*        <Form.Label>Tỉnh/Thành phố</Form.Label>*/}
                                        {/*        <Form.Control/>*/}
                                        {/*    </Form.Group>*/}

                                        {/*    <div className="col-auto my-1">*/}
                                        {/*        <label className="mr-sm-2"*/}
                                        {/*               htmlFor="inlineFormCustomSelect">Quận/Huyện</label>*/}
                                        {/*        <select className="custom-select mr-sm-2"*/}
                                        {/*                id="inlineFormCustomSelect">*/}
                                        {/*            <option selected>Chọn...</option>*/}
                                        {/*            <option value="1">One</option>*/}
                                        {/*            <option value="2">Two</option>*/}
                                        {/*            <option value="3">Three</option>*/}
                                        {/*        </select>*/}
                                        {/*    </div>*/}
                                        {/*</Row>*/}

                                        <Button variant="primary" type="submit">
                                            Cập nhật thông tin
                                        </Button>
                                    </Form>
                                </Card.Body>


                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        /*
            Case register account
        */
        return (
            <div>
                <div>
                    <Navbar/>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <Card className="d-flex col-12 col-sm-6 justify-content-center" border="dark">
                                <Card.Header>Anh/ chị chưa đăng nhập. Vui lòng đăng nhập để có trải nghiệm tốt hơn</Card.Header>

                                <Card.Body>
                                    <Card.Title>Đăng nhập</Card.Title>

                                    <Form>
                                        <Row className="mb-3">

                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text>+84</InputGroup.Text>
                                                    <Form.Control onChange={(event) => {
                                                        setNumberPhoneLogin(event.target.value)
                                                    }}
                                                                  type="text" placeholder="..."/>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Mật khẩu</Form.Label>
                                            <Form.Control onChange={(event) => {
                                                setPasswordLogin(event.target.value)
                                            }}
                                                          type="password" placeholder="..."/>
                                        </Form.Group>

                                        <Button className="mr-3" variant="primary" onClick={handleSignInAccount} type="submit">
                                            Đăng nhập
                                        </Button>
                                    </Form>
                                    <div className="line mt-5 mb-5"></div>
                                    Hoặc đăng ký <a href="/dang-ky"> Tại đây</a>
                                </Card.Body>

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
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