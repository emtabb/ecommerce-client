import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer className="footer bg-green-800" style={{height: "auto"}}>
                <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="mb-lg-0 mb-4">

                        </div>
                        <div className="">
                            <ul className="nav nav-footer justify-content-center justify-content-lg-center">
                                <li className="nav-item">
                                    <a href="https://www.creative-tim.com" className="nav-link text-white-50">
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