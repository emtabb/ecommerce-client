import { IoSearchCircle } from "react-icons/io5"
import styled from "styled-components";

import {useState, useEffect} from 'react';

const Header = styled.div`
    float: none;
    padding: 0;
    position: relative;
    padding-left: 140px;
`;

const Logo = styled.div`
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    max-width: 125px;
`;


const TopBarMenuItem = styled.div`
    display: inline;
    position: absolute;
    width: 70%;
    height: 62px;
    margin-left: 35px;
`;

const HeaderBlock = styled.div`
    float: left;
    flex-direction: row;            /* default value; can be omitted */
    flex-wrap: nowrap;              /* default value; can be omitted */
    justify-content: space-between; /* switched from default (flex-start, see below) */
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
`;

const MenuItem = styled.a`
    color: white;
    &:hover {
        color: white;
        border-bottom: 4px double;
    }
    &.active {
        border-bottom: 4px double;
    }
`;

const CoffeeMainMenu = () => {

    // const currentPath = window.location.pathname;
    const [currentPath, setCurrentPath] = useState("");
    useEffect(() => {
        setCurrentPath(window.location.pathname);

        return () => {
            setCurrentPath("");
        }
    }, []);
    const navbarItems = [
        {
            href: "/",
            src: "/coffee-menu.png",
            text: "Trang chủ"
        },
        {
            href: "/ve-chung-toi",
            src: "/coffee-menu.png",
            text: "Về chúng tôi"
        },
        {
            href: "/san-pham",
            src: "/coffee-menu.png",
            text: "Sản phẩm"
        },
        {
            href: "/tin-tuc",
            src: "/take-away-coffee-icon.png",
            text: "tin tức"
        },
        {
            href: "/lien-he",
            src: "/delivery-icon.png",
            text: "liên hệ"
        },
    ];
    const isHomePage = currentPath === "" || currentPath === "/";
    return (
        <>
            <div className="container">
                <Header>
                    <TopBarMenuItem>
                        <HeaderBlock>
                            {
                                navbarItems.map(item => {
                                const itemPath = item.href.replace("/", "");
                            
                                if(isHomePage) {
                                    return (
                                    <div>
                                        <MenuItem className={"active"} href={item.href}>
                                            {item.text.toUpperCase()}
                                        </MenuItem>
                                    </div>)
                                } else {
                                    return (
                                    <div>
                                        <MenuItem className={currentPath.includes(itemPath) && item.href !== "/" ? "active" : ""} 
                                        href={item.href}>
                                            {item.text.toUpperCase()}
                                        </MenuItem>
                                    </div>)
                                }
                                })
                            }
                            {/* <div><MenuItem className="active" href="/">TRANG CHỦ</MenuItem></div>
                            <div><MenuItem href="/ve-chung-toi">VỀ CHÚNG TÔI</MenuItem></div>
                            <div><MenuItem href="/san-pham">SẢN PHẨM</MenuItem></div>
                            <div><MenuItem href="/tin-tuc">TIN TỨC</MenuItem></div>
                            <div><MenuItem href="/lien-he">LIÊN HỆ</MenuItem></div> */}

                        </HeaderBlock>
                    </TopBarMenuItem>
                </Header>
            </div>
        </>
    );
};

export default CoffeeMainMenu;