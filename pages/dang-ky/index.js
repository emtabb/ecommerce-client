import Navbar from "../../components/Navbar";
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import requests from "../../components/requests";
import constants from "../../components/constants";
import Footer from "../../components/Footer";
import cartRequest from "../../components/requests/cartRequests";
import AbstractPageFacade from "../../facade/AbstractPageFacade";

const { ACTION_GET_CART } = constants;


function RegisterPage({API, SPACE_NAME, DEFAULT_COLOR, FOOTER_ADDRESS, FOOTER_CONTACT}) {

    const api = API;

    const [productsCart, setProductsCart] = useState([]);
    const [numberPhone, setNumberPhone] = useState("");
    const [password, setPassword] = useState("");
    const [rewritePassword, setRewritePassword] = useState("");
    const [location, setLocation] = useState("");
    const [loginForm, setLoginForm] = useState({});
    const [isLogin, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [missMatchPassword, setMissMatchPassword] = useState(false);

    async function handleSignUpAccount() {
        if (password !== rewritePassword) {
            document.getElementById("rewritePasswordSignUp").focus();
            setMissMatchPassword(true);
            return;
        }
        const requestLogin = {
            user_sso: numberPhone,
            password: password,
            location: location,
            space: SPACE_NAME,
        }
        let responseData = await requests.postData(api.concat("/api/verify/customer/register"), requestLogin, constants.ACCESS_TOKEN);
        if (responseData.message === "SUCCESS") {
            setLogin(true);
            alert("Đăng ký thành công")
            window.location.href = "/ca-nhan";
        } else {
            alert("Đăng ký thất bại, số điện thoại đã được sử dụng");
        }
    }

    const handleCartData = (data) => {
        setProductsCart(data);
        setLoading(true);
    }

    useEffect(() => {
        let payload = {
            action: ACTION_GET_CART
        }

        handleCartData(cartRequest(payload));
        return () => {
            setLogin(false);
            setPassword("");
            setNumberPhone("");
            setMissMatchPassword(false);
            setProductsCart([]);
        };
    }, []);

    return (
        <div>
            <div>
                {loading
                    ? (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={productsCart.length}/>)
                    : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0}/>)
                }
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <Card className="d-flex col-12 col-sm-6 justify-content-center" border="dark">
                            <Card.Header>Điền thông tin đăng ký</Card.Header>

                            <Card.Body>
                                <Card.Title>Đăng ký</Card.Title>

                                <div>
                                    <Row className="mb-3">

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>+84</InputGroup.Text>
                                                <Form.Control value={numberPhone} onChange={(event) => {
                                                    setNumberPhone(event.target.value)
                                                }}
                                                              type="text" placeholder="..."/>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control value={password} onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                                      type="password" placeholder="..."/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Nhập lại mật khẩu
                                            {missMatchPassword ? (<span className="text-danger">* Mật khẩu nhập lại không giống ở trên</span>) : (<></>)}
                                        </Form.Label>
                                        <Form.Control id="rewritePasswordSignUp"
                                                      onChange={(event) => {
                                                          setRewritePassword(event.target.value)
                                                      }} type="password" placeholder="..."/>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control onChange={(event) => {
                                            setLocation(event.target.value)
                                        }} type="text" placeholder="..."/>
                                    </Form.Group>

                                    <Button className="mr-3" variant="primary" onClick={handleSignUpAccount}
                                            type="submit">
                                        Đăng ký
                                    </Button>
                                </div>
                                <div className="line mt-5 mb-5"></div>

                            </Card.Body>

                        </Card>
                    </div>
                </div>
                <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                    FOOTER_CONTACT={FOOTER_CONTACT}
                    FOOTER_ADDRESS={FOOTER_ADDRESS}
                />
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const serverData = AbstractPageFacade.initialEnvProperties();

    return {
        props: serverData
    }
}

export default RegisterPage;