import styled from "styled-components";
import { data_config } from '../constants/data_config';
import { AiOutlineClockCircle, AiFillPhone, AiOutlineMail } from 'react-icons/ai'

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
    width: 63%;
    justify-content:space-between;
    height: 60px;
    font-size: 18px;
    margin-left: 94px;
`;

const HeaderWrapper = () => {

    const phoneNumber = data_config.clientInfo.phoneNumber;
    const email = data_config.clientInfo.email;

    return (
        <>
            <div className="container">
                <Header>
                    <Logo>
                        <a href="https://caferunam.com" className="logo">
                            <img style={{maxWidth: '100px', padding: '5px 0 5px'}} className="logo-image" src="https://caferunam.com/wp-content/uploads/2019/08/logo-1.png" alt="logo" />
                        </a>
                    </Logo>
                    <TopBarMenuItem>
                        <HeaderBlock>
                            <div className="d-inline-flex align-items-center"><AiOutlineClockCircle></AiOutlineClockCircle> Thứ 2 – Thứ 7: 08:00 – 17:00</div>
                            <div className="d-inline-flex align-items-center"><AiFillPhone></AiFillPhone> {phoneNumber}</div>
                            <div className="d-inline-flex align-items-center"><AiOutlineMail></AiOutlineMail> {email}</div>
                        </HeaderBlock>
                    </TopBarMenuItem>
                </Header>
            </div>
        </>
    )
};

export default HeaderWrapper;