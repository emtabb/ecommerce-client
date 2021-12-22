import React from 'react';
import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";
import styles from "./styles.module.css";

export default function Footer ({DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {
    const logo = "/images/LogoSPremium.png";

    return (
        <>
            <footer className={`${styles.footer} ${"footer ".concat(PopulateBackgroundColor.populateFooter(DEFAULT_COLOR))}`}>
                <div className="container">
                    <div className="row">
                        <div id={styles['footer_c1']} className="col-md-3 col-sm-4">
                            <div className={styles.logo}>
                                <img src={logo.src} alt="Logo" />
                            </div>
                            <div className={styles.LogoCCDVSaleNoti}>
                                <img src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png" alt="" />
                            </div>
                            <div className={styles.socials}>
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-youtube"></i>
                            <i className="bi bi-instagram"></i>
                            </div>
                        </div>
                        <div id={styles['footer_c2']} className="col-md-5 col-sm-4">
                            <h5>S-Premium Coffee & Restaurant</h5>
                            <ul className="">
                                <li className="nav-item">
                                <i className="bi bi-cursor-fill mr-2"></i>
                                        {FOOTER_ADDRESS}
                                </li>
                                <li className="nav-item">
                                    <i className="bi bi-telephone-fill mr-2"></i>
                                        {FOOTER_CONTACT}
                                        
                                </li>
                                <li className="nav-item">
                                    Số giấy chứng nhận đăng ký kinh doanh: 0313505746 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp ngày 26/10/2015
                                </li>
                            </ul>
                        </div>
                        <div id={styles['footer_c3']} className="col-md-4 col-sm-4">
                            <h5>Thông tin liên hệ</h5>
                            <ul className="">
                                <li className="nav-item">
                                    <i className="bi bi-info-square-fill mr-2"></i>
                                    contactus@spremiumcoffeerestaurant.com
                                </li>
                                <li className="nav-item">
                                    <i className="bi bi-cursor-fill mr-2"></i>
                                            {FOOTER_ADDRESS}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <section className={styles['sign-policy']}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">© 2021 BY S-PREMIUM. ALL RIGHTS RESERVED.</div>
                        <div className="col-md-4">
                            <span className='pr-5'>CHÍNH SÁCH BẢO MẬT</span>
                            <span className=''>ĐIỀU KHOẢN SỬ DỤNG</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}