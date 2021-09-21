import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';
import requests from '../requests';
import constants from "../constants"

import util from "../util/util";

import cartRequest from "../requests/cartRequests";
import userRequest from "../requests/userRequests";

const { ACTION_ADD_TO_CART, ACTION_REMOVE_FROM_CART, ACTION_CLEAR_CART, ACTION_GET_CART, ACTION_UPDATE_ITEM_CART } = constants;
const { ACTION_GET_USER_INFORMATION, ACTION_SET_USER_INFORMATION, ACTION_UPDATE_USER_INFORMATION, ACTION_DELETE_USER_INFORMATION, ACCESS_TOKEN } = constants;

function getUser() {
    let payload = {
        action: ACTION_GET_USER_INFORMATION,
        data  : {}
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
        data  : userData
    }
    return userRequest(payload);
}

const CartContent = (props) => {

    const { api, space } = props;
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

    const [cartData, setCartData] = useState([]);
    const [chooseOption, setChooseOption] = useState(false);
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(getUser());
        setCartData(getCart());
        setChooseOption(false);

        return () => {
            setCartData([]);
            setChooseOption(false);
            setUser({})
        }
    }, [])

    async function sendRequest() {
        let cart = getCart();
        let objectCart = {};

        if (util.isBlank(user.user_sso)) {
            alert("Chưa cập nhật số điện thoại");
            document.getElementById("numberPhoneValidationFocus").focus();
            return;
        } else if (util.isBlank(user.location)) {
            alert("Chưa nhập địa chỉ giao hàng");
            document.getElementById("locationValidationFocus").focus();
            return;
        }

        if (!user.isLogin) {
            let loginUser = {
                space : space,
                user_sso: user.user_sso,
                location: user.location,
            }
            let generateShortTermAccessToken = await requests.postData(
                api.concat("/api/verify/generate-short-term-access-token"), loginUser);
            if (generateShortTermAccessToken.message !== "FAIL") {
                console.log(generateShortTermAccessToken);
                let access_token = generateShortTermAccessToken.token.access_token;
                let dataUserLoginPayload = {
                    user_sso: generateShortTermAccessToken.token.user_sso,
                    location: generateShortTermAccessToken.token.location,
                    isLogin : true,
                    ott     : true,
                }
                console.log(dataUserLoginPayload);
                requests.setSessionStorage(ACCESS_TOKEN, access_token);
                let payloadShortUserLogin = {
                    action: ACTION_SET_USER_INFORMATION,
                    data  : dataUserLoginPayload
                }
                setUser(userRequest(payloadShortUserLogin));
            }
        }

        if (requests.getSessionStorage(ACCESS_TOKEN)) {

            let cartSelected = cart.filter(product => product.selected);
            objectCart.outboxes = cartSelected.map(product => {
                product.location = user.location;
                product.user_sso = user.user_sso;
                return product;
            });

            let response = await requests.postData(api.concat("/api/workflow/graph"), objectCart, ACCESS_TOKEN);

            if (response.message === "SUCCESS") {
                for (let i = 0; i < cartSelected.length; i++) {
                    setCartData(removeFromCart(cartSelected[i]));
                }
                alert("Đặt hàng thành công");
                window.location.href="/don-hang"
            } else {
                alert("Đặt hàng thất bại");
                window.location.href="/don-hang"
            }
        } else {
            alert("Xin vui lòng kiểm tra lại thông tin");
        }
    }


    if (cartData.length === 0 || !Array.isArray(cartData)) {
        return (
            <div className="row">
                <Card className="col-xs-12 col-12 col-md-8 p-3" style={{ minHeight: '18rem' }}>
                    Không có sản phẩm trong giỏ hàng
                </Card>
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-12 p-4 bg-white border border-radius justify-content-center mb-3 container-fluid">
                    <div className="row">
                        {
                            chooseOption ? (
                                <div className="col-3">
                                    <Button className="ml-3 mr-3 w-100" onClick={cancelChooseAll} variant="secondary">{CANCEL_ALL_TEXT_INFO}</Button>
                                </div>

                            ) : (
                                    <div className="col-3">
                                        <Button className="ml-3 mr-3 w-100" onClick={chooseAll} variant="info"> {CHOOSE_ALL_TEXT_INFO} </Button>
                                    </div>
                                )
                        }
                        <div className="col-3">
                            <Button className="ml-3 mr-3 w-100" onClick={clearCart} variant="danger">Xóa toàn bộ.</Button>
                        </div>
                    </div>
                </div>

                <div className="col-xs-12 col-12 col-md-6">
                    <h1 className="w-100"><span className="badge badge-secondary w-100">Thông tin đơn hàng</span></h1>
                    {cartData.map(product =>
                        <CartItem key={product.index} api={api} actionCart={setCartData} product={product} />
                    )}
                </div>

                <RightNavigation user={user} setUser={setUser} cartData={cartData} sendRequest={sendRequest} />

            </div>
        )
    }
}

const RightNavigation = (props) => {
    const { cartData, sendRequest, user, setUser } = props;
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
            <Card className="p-3 shadow w-100 mb-3" style={{ width: '18rem' }}>
            <h1 className="mb-5"><span className="badge badge-warning text-white w-100"> Thông tin khách hàng </span></h1>
                <Location userInformation={user} setUserInformation={setUser} />
                <div className="line"></div>
                <div className="input-group mt-4 mb-4">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Thành Tiền: </span>
                    </div>
                    <input className="form-control" type="text" value={util.beautyNumber(totalPrice)} readOnly />
                    <div className="input-group-append">
                        <span className="input-group-text"> đ</span>
                    </div>
                </div>
                <div className="w-100">
                    <Button className="w-100" onClick={sendRequest} variant="success"><h3> Tạo đơn hàng </h3></Button>
                </div>
                <div className="line"></div>
            </Card>
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
                <input id="locationValidationFocus" type="text" className="form-control" value={location} onChange={onChangeLocation} placeholder="Vui lòng nhập địa chỉ giao hàng" />
            </div>

            <label>Số điện thoại <span className="text-danger">*</span></label>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">+84</span>
                </div>
                <input id="numberPhoneValidationFocus" className="form-control" type="text" value={userSso} onChange={onChangePhoneNumber} placeholder="Vui lòng nhập số điện thoại liên lạc" />
            </div>
        </div>
    )
}

const CartItem = (props) => {
    const { product, api, actionCart } = props;

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
        <Card className="p-3 shadow w-100 mb-3" style={{ width: '18rem' }}>

            <div className="form-check mb-3 w-100">
                <input className="form-check-input"
                    style={{ width: "1.6rem", height: "1.6rem" }}
                    type="checkbox" checked={product.selected} onClick={updateAddToPayment} />
                <label className="form-check-label" htmlFor="autoSizingCheck"/>
            </div>

            <Card.Img variant="top" src={background} />
            <Card.Body>
                <Card.Title>{product.label}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>
                    <div className="input-group mb-1 mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Số lượng:</span>
                        </div>
                        <input type="number" onChange={updateProductPurchase} value={product.purchase} className="form-control" />
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="input-group mb-1 mt-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Giá tiền: </span>
                        </div>
                        <input className="form-control" type="text" onChange={updateProductPurchase} value={util.beautyNumber(product.promotion * product.purchase)} readOnly />
                        <div className="input-group-append">
                            <span className="input-group-text"> đ</span>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <label >Ghi chú: </label>
                    <textarea className="form-control" type="text" onChange={updateNotes} value={product.notes} />
                </ListGroupItem>
                <ListGroupItem>
                    <div className="form-row align-items-center mt-2">
                        <div className="col-auto">
                            <Button className="teal-500" variant="outline-danger" onClick={removeProductFromCart}>Xóa Khỏi Giỏ Hàng</Button>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </Card>
    )
}

export default CartContent;