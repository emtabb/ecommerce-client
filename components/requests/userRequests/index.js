import requests from '../index'
import constants from "../../constants";

const { ACTION_GET_USER_INFORMATION, ACTION_SET_USER_INFORMATION, ACTION_UPDATE_USER_INFORMATION, ACTION_DELETE_USER_INFORMATION} = constants;
const USER_KEY_ITEM_LOCAL_STORAGE = "__USER__KEY__ITEM__LOCAL__STORAGE__";
const { getItem, storeItem } = requests;
const userRequest = (payload) => {
    let state = [];
    switch (payload.action) {
        case ACTION_GET_USER_INFORMATION    : state = getUser(); break;
        case ACTION_SET_USER_INFORMATION    : state = setUser(payload.data); break;
        case ACTION_UPDATE_USER_INFORMATION : state = updateUser(payload.data); break;
        case ACTION_DELETE_USER_INFORMATION : state = deleteUser(payload.data); break;
    }
    return state;
}

const storeUser = (item) => {
    storeItem(USER_KEY_ITEM_LOCAL_STORAGE, item);
    return item;
}

const getUser = () => {
    let item = getItem(USER_KEY_ITEM_LOCAL_STORAGE);
    if (item === "") {
        item = {}
    }
    return item;
}

const setUser = (item) => {
    return storeUser(item);
}

const updateUser = (item) => {
    return storeUser(item);
}

const deleteUser = (item) => {
    return storeUser({});
}

module.exports = userRequest;