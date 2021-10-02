import React, {useEffect, useState} from 'react';
import FigureComponent from './FigureComponent';
import {useRouter} from 'next/router'

import constants from "./constants"

import cartRequest from "./requests/cartRequests";
const { ACTION_GET_CART } = constants;
const navbarData = [
    {
        href: "/",
        src: "/coffee-menu.png",
        text: "Sản phẩm"
    },
    {
        href: "/gio-hang",
        src: "/take-away-coffee-icon.png",
        text: "Giỏ hàng"
    },
    {
        href: "/don-hang",
        src: "/delivery-icon.png",
        text: "Đơn hàng"
    },
]

function Navbar() {
    const router = useRouter();
    const currentPath = router.pathname;

    const [currentProductInCart, setCurrentProductInCart] = useState(0);

    useEffect( () => {
        let payload = {
            action: ACTION_GET_CART
        }
        setCurrentProductInCart(cartRequest(payload).length);

        return () => {
            setCurrentProductInCart(0)
        }
    }, [])

    const profile = {
        href: "/ca-nhan",
        src: "/personal-icon.png",
        text: "Cá nhân"
    };
    return (
        <nav className="navbar navbar-expand navbar-light bg-green-800 container-fluid justify-content-between shadow sticky-top">
            <a className="navbar-brand" href="/">
                {/*< FigureComponent>*/}
                <img src="/gnikecoffee.jpeg" style={{width: "3.5rem", height: "3.5rem"}}
                     className="d-inline-block align-top rounded-circle" alt="Gnik E Coffee" />
            </a>
            <ul className="navbar-nav" style={{right: 0}}>
                {
                    navbarData.map(data => {
                        return (
                            <li className="nav-item" key={data.href}>
                                <a className={"badge ".concat(currentPath === data.href ? "bg-green-900" : "bg-green-800") } href={data.href}>
                                    <FigureComponent
                                        style={{width: "3rem", height: "1.5rem"}}
                                        src={data.src}
                                        text={data.text}
                                        textColor={"text-light"}
                                        notification={data.href === "/gio-hang" ? (currentProductInCart !== 0 ?
                                            currentProductInCart : <></>)
                                            : <></>
                                        }
                                    />
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <a className={"badge ".concat(currentPath === profile.href ? "bg-green-900" : "bg-green-800")} href={profile.href}>
                <FigureComponent
                    style={{width: "3rem", height: "1.5rem"}}
                    src={profile.src}
                    text={profile.text}
                    textColor="text-light"
                />
            </a>
        </nav>
    )

}

export default Navbar;