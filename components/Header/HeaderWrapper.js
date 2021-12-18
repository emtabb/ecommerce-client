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
`;

const HeaderWrapper = () => {
    return (
        <>
            <div className="container">
                <Header>
                    <Logo>
                        <a href="https://caferunam.com" className="logo ">
                            <img style={{maxWidth: '100px', padding: '5px 0 5px'}} className="logo-image" src="https://caferunam.com/wp-content/uploads/2019/08/logo-1.png" alt="logo" />
                        </a>
                    </Logo>
                    <TopBarMenuItem>
                        <HeaderBlock>
                            <div><p> Thứ 2 – Thứ 7: 08:00 – 17:00</p></div>
                            <div><p>  (+084) (272) 3733 703</p></div>
                            <div><p>   contactus@caferunam.com</p></div>
                        </HeaderBlock>
                    </TopBarMenuItem>
                </Header>
            </div>
        </>
    )
}

export default HeaderWrapper;