import requests from "../index";
import constants from "../../constants";

const { getItem, storeItem } = requests;
const { ACTION_ADD_TO_CART, ACTION_REMOVE_FROM_CART, ACTION_CLEAR_CART, ACTION_GET_CART, ACTION_UPDATE_ITEM_CART } = constants;
const CART_KEY_ITEM_LOCAL_STORAGE = "__CART__KEY__ITEM__LOCAL__STORAGE__";
const cartRequest = (payload) => {
    let state = [];
    switch (payload.action) {
        case ACTION_GET_CART         : state = getCart(); break;
        case ACTION_ADD_TO_CART      : state = addToCart(payload.data); break;
        case ACTION_UPDATE_ITEM_CART : state = updateProductCart(payload.data); break;
        case ACTION_REMOVE_FROM_CART : state = removeFromCart(payload.data); break;
        case ACTION_CLEAR_CART       : state = clearCart(payload.data); break;
    }
    return state;
}

const getCart = () => {
    let items = getItem(CART_KEY_ITEM_LOCAL_STORAGE);
    if (!Array.isArray(items)) {
        items = []
    }
    return items;
}

const storeCart = (items) => {
    storeItem(CART_KEY_ITEM_LOCAL_STORAGE, items);
    return items;
}

const addToCart = (item) => {
    let items = getCart();
    item.index = items.length + 1;
    items = [...items, item];
    return storeCart(items);
}

const updateProductCart = (item) => {
    let items = getCart();
    let updateItems = items.filter(_item => _item.index !== item.index);
    items = [...updateItems, item].sort( (item1, item2) => item1.index - item2.index);
    return storeCart(items);
}

const removeFromCart = (item) => {
    let items = getCart().filter(_item => item.index !== _item.index);
    return storeCart(items);
}

const clearCart = () => {
    return storeCart([]);
}

export default cartRequest;