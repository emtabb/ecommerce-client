import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer bg-success-800" style={{height: "10rem"}}>
                <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="mb-lg-0 mb-4">

                        </div>
                        <div className="">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-center">
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-white-50">
                                        Mọi thắc mắc xin liên hệ: 0909.968.088
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link text-white-50">
                                        Địa chỉ cửa hàng: 860/29-31 Xô Viết Nghệ Tĩnh, Phường 25, Quận Bình Thạnh, TP Hồ Chí Minh.
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;