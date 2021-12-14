import React, {useState, useEffect} from 'react';
import requests from "../../components/requests";
import constants from "../../components/constants";
import Navbar from "../../components/Navbar";
import {Button, Card, Col, Form, Row, InputGroup} from "react-bootstrap";
import userRequest from "../../components/requests/userRequests";
import LoadingPage from "../../components/LoadingPage";
import Footer from "../../components/Footer";
import cartRequest from "../../components/requests/cartRequests";
import AbstractPageFacade from "../../facade/AbstractPageFacade";

const { ACTION_GET_CART } = constants;


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

function setUser(data) {
    let payload = {
        action: constants.ACTION_SET_USER_INFORMATION,
        data: data
    }
    return userRequest(payload)
}

export default function PersonalInformation({API, SPACE_NAME, DEFAULT_COLOR, FOOTER_ADDRESS, FOOTER_CONTACT}) {

    const api = API;

    const [productsCart, setProductsCart] = useState([]);

    const [userInformation, setUserInformation] = useState({});
    const [userData, setUserData] = useState({});
    const [numberPhoneLogin, setNumberPhoneLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [rewritePassword, setRewritePassword] = useState("");
    const [missMatchPassword, setMissMatchPassword] = useState(false);
    // Update information
    const [locationData, setLocationData] = useState("");
    const [emailData, setEmailData] = useState("");
    const [numberPhone, setNumberPhone] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLoadUserInformation() {
        let userResponse = await requests.getData(`${api}/api/user/sso`, constants.ACCESS_TOKEN);
        if (userResponse.message === "SUCCESS") {
            let userResponseData = userResponse.data;
            userResponseData.isLogin = true;
            setUserData(userResponseData);
            setUser(userResponseData);

            let userInfoResponse = await requests.getData(api.concat("/api/user/information"), constants.ACCESS_TOKEN);
            if (userInfoResponse.message !== "NOT FOUND") {
                const userInfoResponseData = userInfoResponse.data;
                setUserInformation(userInfoResponse.data);

                setLocationData(userInfoResponseData.location);
                setFirstname(userInfoResponseData.firstname)
                setEmailData(userInfoResponseData.email)
                setNumberPhone(userInfoResponseData.user_sso);
            }
        }
    }

    async function handleSignInAccount() {
        const requestLogin = {
            username: numberPhoneLogin,
            password: passwordLogin,
        }
        let responseData = await requests.postData(api.concat("/verify/login"), requestLogin);
        if (responseData.message === "Invalid authentication") {
            alert("Nhập sai số điện thoại hoặc mật khẩu đăng nhập!!!");
        } else if (responseData.access_token) {
            requests.setSessionStorage(constants.ACCESS_TOKEN, responseData[constants.ACCESS_TOKEN]);
            requests.setSessionStorage(constants.USER_SSO, responseData[constants.USER_SSO]);
            let userResponse = await requests.getData(api.concat("/api/user/sso"), constants.ACCESS_TOKEN);
            let userResponseData = userResponse.data;
            userResponseData.isLogin = true;
            setUser(userResponseData);
            window.location.href = "/ca-nhan";
        }
    }

    async function handleActiveAccount() {
        if (password !== rewritePassword) {
            document.getElementById("rewritePasswordSignUp").focus();
            setMissMatchPassword(true);
        }
        const requestLogin = {
            user_sso: userData.user_sso,
            name: firstname,
            password: password,
            location: locationData,
            space: SPACE_NAME,
        }
        let responseData = await requests.postData(api.concat("/api/verify/customer/active-account"), requestLogin, constants.ACCESS_TOKEN);
        if (responseData.message === "SUCCESS") {
            alert("Đăng ký thành công");
            window.location.href = "/ca-nhan";
        }
    }

    async function handleUpdateInformation() {
        let requestData = {
            user_sso: numberPhone,
            firstname: firstname,
            email: emailData,
            location: locationData
        }
        let responseData = await requests.putData(api.concat("/api/user/information"), requestData, constants.ACCESS_TOKEN);
        if (responseData.message === "SUCCESS") {
            alert("Cập nhật thông tin thành công");
            window.location.href = "/ca-nhan";
        } else {
            alert("Hệ thống xảy ra lỗi, vui lòng cập nhật sau.")
        }
    }

    const handleCartData = (data) => {
        setProductsCart(data);
        setLoading(true);
    }

    useEffect(() => {
        handleLoadUserInformation().then().catch();
        let payload = {
            action: ACTION_GET_CART
        }
        handleCartData(cartRequest(payload));
        return () => {
            setUserInformation({});
            setUserData({});
            setPasswordLogin("");
            setNumberPhoneLogin("");
            setLocationData("");
            setLoading(false);
            setMissMatchPassword(false);
            setFirstname("");
            setNumberPhone("");
            setEmailData("");
        };
    }, []);

    if (!loading) {
        return <LoadingPage/>
    } else {
        if (userData.disabled) {
            /*
                This case is user have a One Time Token but no Login. userData.disabled === true => one time token.
            */
            return (
                <div>
                    <div>
                        {loading
                            ? (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={productsCart.length}/>)
                            : (<Navbar DEFAULT_COLOR={DEFAULT_COLOR} currentProductInCart={0}/>)
                        }
                        <div className="container mt-5 mb-5">
                            <div className="row">
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Lưu ý</strong> Quý khách chưa đăng ký tài khoản, vui lòng đăng ký tài khoản
                                    để
                                    có trải nghiệm đặt hàng tốt hơn! (thông tin dưới đây dựa vào thông tin tạo đơn
                                    hàng).
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="col-12 col-sm-6 p-4">
                                    <Card className="d-flex justify-content-center" border="success">
                                        <Card.Header>Thông tin cá nhân</Card.Header>
                                        <Card.Body>
                                            <Card.Title></Card.Title>
                                            <Card.Text>

                                            </Card.Text>
                                            <div>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Anh/ chị</Form.Label>
                                                        <Form.Control type="input"
                                                                      value={firstname}
                                                                      onChange={(event) => {
                                                                          setFirstname(event.target.value)
                                                                      }}
                                                                      placeholder="..."/>
                                                    </Form.Group>
                                                </Row>
                                                <Form.Group>
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>+84</InputGroup.Text>
                                                        <Form.Control value={userData.user_sso}
                                                                      placeholder="..."
                                                                      readOnly
                                                        />
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu</Form.Label>
                                                    <Form.Control value={password} onChange={(event) => {
                                                        setPassword(event.target.value)
                                                    }}
                                                                  type="password" placeholder="..."/>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nhập lại mật khẩu
                                                        {missMatchPassword ? (
                                                            <span className="text-danger">* Mật khẩu nhập lại không giống ở trên</span>) : (<></>)}
                                                    </Form.Label>
                                                    <Form.Control id="rewritePasswordSignUp"
                                                                  onChange={(event) => {
                                                                      setRewritePassword(event.target.value)
                                                                  }} type="password" placeholder="..."/>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Địa chỉ</Form.Label>
                                                    <Form.Control value={locationData}
                                                                  onChange={(event) => {
                                                                      setLocationData(event.target.value);
                                                                  }}
                                                                  placeholder="..."/>
                                                </Form.Group>

                                                <Button variant="primary" type="button" onClick={handleActiveAccount}>
                                                    Đăng ký
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div style={{height: "5rem"}}/>
                        <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                                FOOTER_CONTACT={FOOTER_CONTACT}
                                FOOTER_ADDRESS={FOOTER_ADDRESS}
                        />
                    </div>
                </div>
            )
        } else if (userData.isLogin) {
            /*
                Case update information
            */
            return (
                <div>
                    <div>
                        <Navbar DEFAULT_COLOR={DEFAULT_COLOR} productsCart={productsCart}/>
                        <div className="container mt-5 mb-5">
                            <div className="row">
                                <div className="col-12 col-sm-6 p-4">
                                    <Card className=" d-flex justify-content-center shadow"
                                          border="success">
                                        <Card.Header>Thông tin cá nhân</Card.Header>

                                        <Card.Body>
                                            <Card.Title>Cập nhật thông tin cá nhân</Card.Title>
                                            <Card.Text>

                                            </Card.Text>
                                            <div>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Anh/ chị</Form.Label>
                                                        <Form.Control value={firstname} type="input"
                                                                      placeholder="..." onChange={(event) => {
                                                            setFirstname(event.target.value)
                                                        }}/>
                                                    </Form.Group>
                                                </Row>

                                                <Form.Group>
                                                    <Form.Label>Số điện thoại</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text>+84</InputGroup.Text>
                                                        <Form.Control value={numberPhone}
                                                                      onChange={(event) => {
                                                                          setNumberPhone(event.target.value)
                                                                      }}
                                                                      placeholder="..."
                                                                      readOnly
                                                        />
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Địa chỉ</Form.Label>
                                                    <Form.Control value={locationData}
                                                                  onChange={(event) => {
                                                                      setLocationData(event.target.value)
                                                                  }}
                                                                  placeholder="..."/>
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Địa chỉ email</Form.Label>
                                                    <Form.Control value={emailData}
                                                                  onChange={(event) => {
                                                                      setEmailData(event.target.value)
                                                                  }}
                                                                  placeholder="..."/>
                                                </Form.Group>

                                                <Button variant="primary" type="button"
                                                        onClick={handleUpdateInformation}>
                                                    Cập nhật thông tin
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div style={{height: "5rem"}}/>
                        <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                                FOOTER_CONTACT={FOOTER_CONTACT}
                                FOOTER_ADDRESS={FOOTER_ADDRESS}
                        />
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
                        <Navbar DEFAULT_COLOR={DEFAULT_COLOR} productsCart={productsCart}/>
                        <div className="container mt-5 mb-5">
                            <div className="row">
                                <div className="col-12 col-sm-6 p-3">
                                    <Card className="d-flex justify-content-center " border="success">
                                        <Card.Header>Anh/ chị chưa đăng nhập. Vui lòng đăng nhập để có trải nghiệm tốt
                                            hơn</Card.Header>

                                        <Card.Body>
                                            <Card.Title>Đăng nhập</Card.Title>
                                            <div>
                                                <Row className="mb-3">

                                                    <Form.Group as={Col}>
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

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mật khẩu</Form.Label>
                                                    <Form.Control id="passwordLoginId" onChange={(event) => {
                                                        setPasswordLogin(event.target.value)
                                                    }}
                                                                  type="password" placeholder="..."/>
                                                </Form.Group>

                                                <Button className="mr-3" variant="primary" onClick={handleSignInAccount}
                                                        type="submit">
                                                    Đăng nhập
                                                </Button>
                                            </div>
                                            <div className="line mt-5 mb-5"></div>
                                            Hoặc đăng ký <a href="/dang-ky"> Tại đây</a>
                                        </Card.Body>

                                    </Card>
                                </div>
                            </div>
                        </div>
                        <div style={{height: "5rem"}}/>
                        <Footer DEFAULT_COLOR={DEFAULT_COLOR}
                                FOOTER_CONTACT={FOOTER_CONTACT}
                                FOOTER_ADDRESS={FOOTER_ADDRESS}
                        />
                    </div>
                </div>
            )
        }
    }
}

export async function getServerSideProps() {
    const serverData = AbstractPageFacade.initialEnvProperties();

    return {
        props: serverData
    }
}