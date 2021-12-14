import React, {useState, useEffect} from 'react';
import {Card, ListGroup, ListGroupItem, Button, Form, Row, Col, InputGroup} from 'react-bootstrap';
import requests from '../requests';
import constants from "../constants"

import util from "../util/util";

import cartRequest from "../requests/cartRequests";
import userRequest from "../requests/userRequests";
import LoadingPage from "../LoadingPage";
import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";

const {ACTION_ADD_TO_CART, ACTION_REMOVE_FROM_CART, ACTION_CLEAR_CART, ACTION_GET_CART, ACTION_UPDATE_ITEM_CART} = constants;
const {ACTION_GET_USER_INFORMATION, ACTION_SET_USER_INFORMATION, ACTION_UPDATE_USER_INFORMATION, ACTION_DELETE_USER_INFORMATION, ACCESS_TOKEN} = constants;

function getUser() {
    let payload = {
        action: ACTION_GET_USER_INFORMATION,
        data: {}
    };
    let user = userRequest(payload)
    if (user === undefined) {
        user = {};
    }
    return user;
}

function setUser(userData) {
    let payload = {
        action: ACTION_SET_USER_INFORMATION,
        data: userData
    }
    return userRequest(payload);
}

const CartContent = (props) => {

    const {api, space, DEFAULT_COLOR} = props;
    const CHOOSE_ALL_TEXT_INFO = "Chọn tất cả";
    const CANCEL_ALL_TEXT_INFO = "Hủy chọn tất cả";

    function getCart() {
        let payload = {
            action: ACTION_GET_CART,
            data: []
        }
        return cartRequest(payload)
    }

    function clearCart() {
        let payload = {
            action: ACTION_CLEAR_CART,
            data: []
        }
        setCartData(cartRequest(payload));
    }

    function chooseAll() {
        setChooseOption(true);
        cartData.forEach(product => {
            product.selected = true;
            let payload = {
                action: ACTION_UPDATE_ITEM_CART,
                data: product
            }
            setCartData(cartRequest(payload));
        });
    }

    function cancelChooseAll() {
        setChooseOption(false);
        cartData.forEach(product => {
            product.selected = false;
            let payload = {
                action: ACTION_UPDATE_ITEM_CART,
                data: product
            }
            setCartData(cartRequest(payload));
        });
    }

    function removeFromCart(product) {
        let payload = {
            action: ACTION_REMOVE_FROM_CART,
            data: product
        }
        return cartRequest(payload);
    }

    async function handleLoadUser() {
        let userResponse = await requests.getData(`${api}/api/user/sso`, constants.ACCESS_TOKEN);
        if (userResponse.message === "SUCCESS") {
            let userResponseData = userResponse.data;
            userResponseData.isLogin = true;
            setUserData(userResponseData);
            setUser(userResponseData);
        } else {
            setUser({});
        }
    }

    const [cartData, setCartData] = useState([]);
    const [chooseOption, setChooseOption] = useState(false);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleLoadUser().then(result => {
            setUserData(getUser());
            setCartData(getCart());
            setChooseOption(false);
            setLoading(true);
        });
        return () => {
            setCartData([]);
            setChooseOption(false);
            setUserData({})
            setLoading(false);
        }
    }, [])

    async function sendRequest() {
        let cart = getCart();
        let objectCart = {};

        if (util.isBlank(userData.user_sso)) {
            alert("Chưa cập nhật số điện thoại");
            document.getElementById("numberPhoneValidationFocus").focus();
            return;
        } else if (util.isBlank(userData.location)) {
            alert("Chưa nhập địa chỉ giao hàng");
            document.getElementById("locationValidationFocus").focus();
            return;
        }

        if (!userData.isLogin) {
            let loginUser = {
                space: space,
                user_sso: userData.user_sso,
                location: userData.location,
            }
            let generateShortTermAccessToken = await requests.postData(
                api.concat("/api/verify/generate-short-term-access-token"), loginUser);
            if (generateShortTermAccessToken.message !== "FAIL") {
                console.log(generateShortTermAccessToken);
                let access_token = generateShortTermAccessToken.token.access_token;
                requests.setSessionStorage(ACCESS_TOKEN, access_token);
                let userResponse = await requests.getData(api.concat("/api/user/sso"), constants.ACCESS_TOKEN);
                if (userResponse.message === "SUCCESS") {
                    let userResponseData = userResponse.data;
                    userResponseData.isLogin = true;
                    let payloadShortUserLogin = {
                        action: ACTION_SET_USER_INFORMATION,
                        data: userResponseData
                    }
                    setUserData(userRequest(payloadShortUserLogin));
                } else {
                    alert("Tạo đơn hàng thất bại");
                    return;
                }
            }
        }

        if (requests.getSessionStorage(ACCESS_TOKEN)) {

            let cartSelected = cart.filter(product => product.selected);
            if (cartSelected.length === 0) {
                alert("Chưa chọn sản phẩm, vui lòng check vào sản phẩm muốn đặt hàng.");
                return;
            }
            objectCart.outboxes = cartSelected.map(product => {
                product.location = userData.location;
                product.user_sso = userData.user_sso;
                return product;
            });

            let response = await requests.postData(api.concat("/api/workflow/graph"), objectCart, ACCESS_TOKEN);

            if (response.message === "SUCCESS") {
                for (let i = 0; i < cartSelected.length; i++) {
                    setCartData(removeFromCart(cartSelected[i]));
                }
                alert("Đặt hàng thành công");
                window.location.href = "/don-hang"
            } else {
                alert("Đặt hàng thất bại");
                window.location.href = "/don-hang"
            }
        } else {
            alert("Xin vui lòng kiểm tra lại thông tin");
        }
    }


    if (cartData.length === 0) {
        return (
            <div className="row">
                <Card className="col-xs-12 col-12 col-md-8 p-3" style={{minHeight: '18rem'}}>
                    Không có sản phẩm trong giỏ hàng
                </Card>
            </div>
        )
    } else {
        if(loading) {
            return (
                <div className="row">
                    <div
                        className="col-12 p-4 bg-white border border-radius justify-content-center mb-3 container-fluid">
                        <div className="row">
                            {
                                chooseOption ? (
                                    <h3 className="col-6 col-md-3">
                                        <Button className="badge badge-pill w-100" onClick={cancelChooseAll}
                                                variant="secondary">{CANCEL_ALL_TEXT_INFO}</Button>
                                    </h3>

                                ) : (
                                    <h3 className="col-6 col-md-3">
                                        <Button className="badge badge-pill w-100" onClick={chooseAll}
                                                variant="info"> {CHOOSE_ALL_TEXT_INFO} </Button>
                                    </h3>
                                )
                            }
                            <h3 className="col-6 col-md-3">
                                <Button className="badge badge-pill w-100" onClick={clearCart} variant="danger">Xóa toàn
                                    bộ.</Button>
                            </h3>
                        </div>
                    </div>

                    <div className="col-xs-12 col-12 col-md-6">
                        <h1 className="w-100"><span className="badge badge-secondary w-100">Thông tin đơn hàng</span>
                        </h1>
                        {cartData.map(product =>
                            <CartItem key={product.index} api={api} actionCart={setCartData} product={product}/>
                        )}
                    </div>

                    <RightNavigation user={userData} setUserData={setUserData} cartData={cartData}
                                     sendRequest={sendRequest} DEFAULT_COLOR={DEFAULT_COLOR}
                    />

                </div>
            )
        } else {
            return (<LoadingPage />)
        }
    }
}

const RightNavigation = (props) => {
    const {cartData, sendRequest, user, setUserData, DEFAULT_COLOR} = props;
    let totalPrice = 0;

    function calculate() {
        let totalCalculate = 0;
        cartData.forEach(product => {
            if (product.selected) {
                totalCalculate += product.promotion * product.purchase;
            }
        })
        return totalCalculate;
    }

    totalPrice = calculate();

    return (
        <div className="col-xs-12 col-12 col-md-6">
            <Card className="p-3 shadow w-100 mb-3" style={{width: '18rem'}}>
                <h1 className="mb-5"><span
                    className="badge badge-warning text-white w-100"> Thông tin khách hàng </span></h1>
                <Location userInformation={user} setUserInformation={setUserData}/>
                <div className="line"></div>
                <div className="input-group mt-4 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Thành Tiền: </span>
                    </div>
                    <input className="form-control" type="text" value={util.beautyNumber(totalPrice)} readOnly/>
                    <div className="input-group-append">
                        <span className="input-group-text"> đ</span>
                    </div>
                </div>
                <div className="line"/>
            </Card>

            <div className="w-100 d-flex align-items-center justify-content-center fixed-bottom">
                <Button size="lg" className="w-75" onClick={sendRequest}
                        variant={PopulateBackgroundColor.populateVariant(DEFAULT_COLOR)}
                >
                    <small>Tạo đơn hàng: - {util.beautyNumber(totalPrice)} đ </small>
                </Button>
            </div>
        </div>
    )
}

const Location = (props) => {

    const {userInformation, setUserInformation} = props;

    const [location, setLocation] = useState("");
    const [userSso, setUserSso] = useState("");

    useEffect(() => {
        setLocation(userInformation.location);
        setUserSso(userInformation.user_sso);

        return () => {
            setLocation("");
            setUserSso("");
        }
    }, []);

    function onChangeLocation(event) {
        let value = event.target.value;
        userInformation.location = value;
        setLocation(value);
        setUserInformation(setUser(userInformation));
    }

    function onChangePhoneNumber(event) {
        let value = event.target.value;
        if (!isNaN(value)) {
            userInformation.user_sso = value;
            setUserSso(value);
            setUserInformation(setUser(userInformation));
        } else {
            setUserSso(userInformation.user_sso);
        }
    }

    return (
        <div>
            <div className="form-group">
                <label>Địa chỉ giao hàng <span className="text-danger">*</span></label>
                <input id="locationValidationFocus" type="text" className="form-control" value={location}
                       onChange={onChangeLocation} placeholder="Vui lòng nhập địa chỉ giao hàng"/>
            </div>

            <label>Số điện thoại <span className="text-danger">*</span></label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">+84</span>
                </div>
                <input id="numberPhoneValidationFocus" className="form-control" type="text" value={userSso}
                       onChange={onChangePhoneNumber} placeholder="Vui lòng nhập số điện thoại liên lạc"/>
            </div>
        </div>
    )
}

const CartItem = (props) => {
    const {product, api, actionCart} = props;

    if (product.selected === undefined) {
        product.selected = false;
    }
    const background = `${api}/blob/${product.background}`;

    function updateNotes(event) {
        product.notes = event.target.value;
        let payload = {
            action: ACTION_UPDATE_ITEM_CART,
            data: product
        }
        actionCart(cartRequest(payload));
    }

    function updateProductPurchase(event) {
        let value = parseInt(event.target.value);
        if (value < 0) {
            product.purchase = 0;
        } else {
            product.purchase = value;
        }
        let payload = {
            action: ACTION_UPDATE_ITEM_CART,
            data: product
        }
        actionCart(cartRequest(payload));
    }

    function updateAddToPayment(event) {
        product.selected = event.target.checked;
        let payload = {
            action: ACTION_UPDATE_ITEM_CART,
            data: product
        }
        actionCart(cartRequest(payload));
    }

    function removeProductFromCart() {
        let payload = {
            action: ACTION_REMOVE_FROM_CART,
            data: product
        }
        actionCart(cartRequest(payload));
    }

    return (
        <Card className="p-3 shadow w-100 mb-3" style={{width: '18rem'}}>

            <div className="form-check mb-3 w-100">
                <input className="form-check-input"
                       style={{width: "1.6rem", height: "1.6rem"}}
                       type="checkbox" checked={product.selected} onClick={updateAddToPayment}/>
                <label className="mt-2 ml-3 form-check-label text-muted" htmlFor="autoSizingCheck">Check vào sản phẩm
                    muốn mua</label>
            </div>

            <Card.Img variant="top" src={background}/>
            <Card.Body>
                <Card.Title>{product.label}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <div className="input-group mb-1 mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Số lượng:</span>
                        </div>
                        <input type="number" onChange={updateProductPurchase} value={product.purchase}
                               className="form-control"/>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="input-group mb-1 mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Giá tiền: </span>
                        </div>
                        <input className="form-control" type="text" onChange={updateProductPurchase}
                               value={util.beautyNumber(product.promotion * product.purchase)} readOnly/>
                        <div className="input-group-append">
                            <span className="input-group-text"> đ</span>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <label>Ghi chú: </label>
                    <textarea className="form-control" type="text" onChange={updateNotes} value={product.notes}/>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="form-row align-items-center mt-2">
                        <div className="col-auto">
                            <Button className="teal-500" variant="outline-danger" onClick={removeProductFromCart}>Xóa
                                Khỏi Giỏ Hàng</Button>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

function ModalCartLogin(props) {

    const {api} = props;

    const [numberPhoneLogin, setNumberPhoneLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    async function handleSignInAccount() {
        const requestLogin = {
            username: numberPhoneLogin,
            password: passwordLogin,
        }
        let responseData = await requests.postData(api.concat("/verify/login"), requestLogin, constants.ACCESS_TOKEN);
        if (responseData.access_token) {
            requests.setSessionStorage(constants.ACCESS_TOKEN, responseData[constants.ACCESS_TOKEN]);
            requests.setSessionStorage(constants.USER_SSO, responseData[constants.USER_SSO]);
            let userResponse = await requests.getData(api.concat("/api/user/sso"), constants.ACCESS_TOKEN);
            let userResponseData = userResponse.data;
            userResponseData.isLogin = true;
            setUser(userResponseData);
            window.location.href = "/ca-nhan";
        }
    }
    useEffect(() => {

        return () => {

        }
    }, [])
    return (
        <div>
            <button type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#modalSignInDefault">

            </button>

            <div className="modal fade" id="modalSignInDefault" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Hệ thống ghi nhận số điện thoại đã được đăng ký, vui lòng đăng nhập để tiếp tục đặt hàng</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="false">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSignInAccount}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartContent;