import React from 'react';
import FigureComponent from './FigureComponent';
import {useRouter} from 'next/router'

import PopulateBackgroundColor from "../facade/populate/PopulateBackgroundColor";

const navbarData = [
    {
        href: "/san-pham",
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


function Navbar({DEFAULT_COLOR, currentProductInCart}) {
    const router = useRouter();
    const currentPath = router.pathname;

    const profile = {
        href: "/ca-nhan",
        src: "/personal-icon.png",
        text: "Cá nhân"
    };
    return (
        <nav className={"navbar navbar-expand navbar-light container-fluid justify-content-between shadow sticky-top "
            .concat(PopulateBackgroundColor.populateBackground(DEFAULT_COLOR))}>
            <a className="navbar-brand" href="/">
                {/*< FigureComponent>*/}
                <img src="/gnikecoffee.jpeg" style={{width: "3.5rem", height: "3.5rem"}}
                     className="d-inline-block align-top rounded-circle" alt="Gnik E Coffee"/>
            </a>
            <ul className="navbar-nav" style={{right: 0}}>
                {
                    navbarData.map(data => {
                        return (
                            <li className="nav-item" key={data.href}>
                                <a className={"badge ".concat(currentPath === data.href
                                    ? PopulateBackgroundColor.populateSelected(DEFAULT_COLOR)
                                    : PopulateBackgroundColor.populateUnselected(DEFAULT_COLOR))} href={data.href}>
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
            <a className={"badge ".concat(currentPath === profile.href
                ? PopulateBackgroundColor.populateSelected(DEFAULT_COLOR)
                : PopulateBackgroundColor.populateUnselected(DEFAULT_COLOR))}
               href={profile.href}>
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