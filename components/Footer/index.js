import React from 'react';
import PopulateBackgroundColor from "../../facade/populate/PopulateBackgroundColor";
import styles from "./styles.module.css";
import logo from "../../public/LogoSPremium.png";

export default function Footer ({DEFAULT_COLOR, FOOTER_CONTACT, FOOTER_ADDRESS}) {
    return (
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
                    </div>
                    <div id={styles['footer_c2']} className="col-md-5 col-sm-4">
                        <h5>S-Premium Coffee & Restaurant</h5>
                        <ul className="">
                            <li className="nav-item">
                                    {FOOTER_CONTACT}
                            </li>
                            <li className="nav-item">
                                    {FOOTER_ADDRESS}
                            </li>
                        </ul>
                    </div>
                    <div id={styles['footer_c3']} className="col-md-4 col-sm-4">
                        <h5>Thông tin liên hệ</h5>
                        <ul className="">
                            <li className="nav-item">
                                    {FOOTER_CONTACT}
                            </li>
                            <li className="nav-item">
                                    {FOOTER_ADDRESS}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}