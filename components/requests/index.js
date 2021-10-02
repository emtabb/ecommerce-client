function storeItem(key, item) {
    let jsonData = { item : item }
    let jsonString = JSON.stringify(jsonData);
    localStorage.setItem(key, jsonString);
}

function getItem(key) {
    let jsonString = localStorage.getItem(key);
    let jsonData = JSON.parse(jsonString);
    if (jsonData === null) {
        return "";
    }
    return jsonData.item;
}

function getSessionStorage(key) {
    let item = sessionStorage.getItem(key);
    if (item === null && item === undefined) {
        return ""
    }
    return item;
}

function setSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

const getData = async (url, keyItem) => {
    let item = getSessionStorage(keyItem);
    if (item !== "") {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : item
            }
        });

        return await response.json();
    } else {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            }
        });
        return await response.json();
    }

}

const postData = async (url = "", data = {}, keyItem) => {
    let item = getSessionStorage(keyItem);
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            "Authorization" : item
        },
        body : JSON.stringify(data)
    });
    return await response.json();
}

const putData = async (url = "", data = {}, keyItem) => {
    let item = getSessionStorage(keyItem);
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            "Authorization" : item
        },
        body : JSON.stringify(data)
    });
    return await response.json();
}

function checkCookie(cookieName) {
    let username = getCookie(cookieName);
    if (username !== "") {
        return true;
    } else {
        return false;
    }
}

const setCookie = (cname, cvalue, exdays) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const eraseCookie = (name) => {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export default {
    getCookie : getCookie,
    setCookie : setCookie,
    eraseCookie: eraseCookie,
    getData   : getData,
    postData  : postData,
    putData   : putData,
    getItem   : getItem,
    storeItem : storeItem,
    getSessionStorage : getSessionStorage,
    setSessionStorage : setSessionStorage,
}
