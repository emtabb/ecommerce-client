import React from 'react';
import FigureComponent from '../FigureComponent';
import {useRouter} from 'next/router'

import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

import HeaderWrapper from './HeaderWrapper';
import CoffeeMainMenu from './CoffeeMainMenu';

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
];

const NavBar = styled.nav`
    height: 130px;
`;

const ThemedHeaderWrapper = styled.div`
    background-color: #fff;
    height: 50%;
`;

const ThemedCoffeeMainMenu = styled.div`
    background-color: #321E14;
    height: 50%;
`;


function Navbar({DEFAULT_COLOR, currentProductInCart}) {
    const router = useRouter();
    const currentPath = router.pathname;

    const profile = {
        href: "/ca-nhan",
        src: "/personal-icon.png",
        text: "Cá nhân"
    };

    
    return (
        <>
            <NavBar className={"".concat(PopulateBackgroundColor.populateBackground(DEFAULT_COLOR))}>
                <ThemedHeaderWrapper>
                    <HeaderWrapper></HeaderWrapper>
                </ThemedHeaderWrapper>
                <ThemedCoffeeMainMenu>
                    <CoffeeMainMenu></CoffeeMainMenu>
                </ThemedCoffeeMainMenu>
                    
                {/* <a className="navbar-brand" href="/">
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
                </a> */}
            </NavBar>
        </>
    )
}

export default Navbar;