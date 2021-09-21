import React, { useState } from 'react';

import requests from '../requests';
import constants from '../constants';

const LoginPage = (props) => {
    const [loginRequest, setLoginRequest] = useState({});


    const handleChangeUsername = (event) => {
        setLoginRequest(preState => ({
            ...preState,
            username: event.target.value
        }))
    }

    const handleChangePassword = (event) => {
        setLoginRequest(preState => ({
            ...preState,
            password: event.target.value
        }));
    };

    const handleSubmitRequestLoginForm = async () => {
        let responseData = await requests.postData("/verify/login", loginRequest);
        if (responseData.access_token) {
            requests.setSessionStorage(constants.ACCESS_TOKEN, responseData[constants.ACCESS_TOKEN]);
            requests.setSessionStorage(constants.USER_SSO, responseData[constants.USER_SSO]);
        }
        window.location.href = "/";
    }

    return (
        <div className="content" style={{width: '480px'}}>
            <div className="container-fluid" style={styles.container}>
                <div className="card">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputUsername">Điền tài khoản</label>
                            <input type="text" className="form-control" id="inputUsername"
                                onChange={handleChangeUsername}
                                placeholder="Điền tài khoản" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Điền mật khẩu</label>
                            <input type="password" className="form-control" id="inputPassword"
                                onChange={handleChangePassword}
                                placeholder="Password" />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleSubmitRequestLoginForm}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
 

const styles = {
    container: {
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        backgroundColor: 'white',
    }
};

export default LoginPage;