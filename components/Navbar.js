import React, {useEffect, useState} from 'react';
import FigureComponent from './FigureComponent';
import {useRouter} from 'next/router'

import constants from "./constants"

import cartRequest from "./requests/cartRequests";
const { ACTION_GET_CART } = constants;
const navbarData = [
    {
        href: "/",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7s05REmBUWcbI71JPF7bGAwzTrDGyFgAnjA&usqp=CAU",
        text: "Sản phẩm"
    },
    {
        href: "/gio-hang",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4WjzkzkDNZ8mqZ5N5fVtGL6UpyJfEwU7qvw&usqp=CAU",
        text: "Giỏ hàng"
    },
    {
        href: "/don-hang",
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9LdKikLXJ-ihHzICuvot44oHXkr76gINWQ&usqp=CAU",
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
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xSMT8QD_BiRyZmT4MtLQePjffsgaA8FE0A&usqp=CAU",
        text: "Cá nhân"
    };
    return (
        <nav className="navbar navbar-expand navbar-light container-fluid justify-content-between shadow sticky-top">
            <a className="navbar-brand" href="/">
                {/*< FigureComponent>*/}
                <img src="/gnikecoffee.jpeg" style={{width: "3.5rem", height: "3.5rem"}}
                     className="d-inline-block align-top rounded-circle" alt="Gnik E Coffee" />
            </a>
            <ul className="navbar-nav" style={{right: 0}}>
                {
                    navbarData.map(data => {
                        return (
                            <li className="nav-item mr-1" key={data.href}>
                                <a className="badge badge-light" href={data.href}>
                                    <FigureComponent
                                        style={{width: "3rem", height: "1.5rem"}}
                                        src={data.src}
                                        text={data.text}
                                        textColor={currentPath === data.href ? "text-primary" : "text-dark"}
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
            <a className="badge badge-light" href={profile.href}>
                <FigureComponent
                    style={{width: "3rem", height: "1.5rem"}}
                    src={profile.src}
                    text={profile.text}
                    textColor={currentPath === profile.href ? "text-primary" : "text-dark"}
                />
            </a>
        </nav>
    )

}

export default Navbar;