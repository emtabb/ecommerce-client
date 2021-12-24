import { IoSearchCircle } from "react-icons/io5"
import styled from "styled-components";

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
`;

const HeaderBlock = styled.div`
    float: left;
    display: inline-flex;
    width: 80%;
    display: flex;                  /* establish flex container */
    flex-direction: row;            /* default value; can be omitted */
    flex-wrap: nowrap;              /* default value; can be omitted */
    justify-content: space-between; /* switched from default (flex-start, see below) */
`;

const CoffeeMainMenu = () => {
    const navbarItems = [
        {
            href: "/tr-pham",
            src: "/coffee-menu.png",
            text: "Sản phẩm"
        },
        {
            href: "/san-pham",
            src: "/coffee-menu.png",
            text: "Sản phẩm"
        },
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

    return (
        <>
            <div className="container">
                <Header>
                    <TopBarMenuItem>
                        <HeaderBlock>
                            <div><a href="/">TRANG CHỦ</a></div>
                            <div><a href="/ve-chung-toi">VỀ CHÚNG TÔI</a></div>
                            <div><a href="/san-pham">SẢN PHẨM</a></div>
                            <div><a href="/tin-tuc">TIN TỨC</a></div>
                            <div><a href="/lien-he">LIÊN HỆ</a></div>
                            <IoSearchCircle></IoSearchCircle>

                        </HeaderBlock>
                    </TopBarMenuItem>
                </Header>
            </div>
        </>
    );
};

export default CoffeeMainMenu;