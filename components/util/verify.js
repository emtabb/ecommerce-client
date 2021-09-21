import axios from 'axios';
import request from '../requests';
import constants from '../constants';

console.log(process.env.DOMAIN);

export async function accessToken() {
    let access_token = request.getCookie(constants.ACCESS_TOKEN)
    if (access_token) {
        let options = {
            url: "/api/SecurityConfig/verify-access-token",
            method: "POST",
            data: JSON.stringify({
                access_token: access_token
            }),
            headers: {
                "Accept" : "application/json",
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
        let verifyByApi = await axios(options);
        if (verifyByApi.data.message === constants.VALID_ACCESS_TOKEN_RESPONSE) {
            return true;
        } else if (verifyByApi.data.message === constants.EXPIRED_ACCESS_TOKEN_RESPONSE) {
            request.eraseCookie(constants.ACCESS_TOKEN);
            request.eraseCookie(constants.USER_SSO);
            return false
        }
    }
    return false
}
