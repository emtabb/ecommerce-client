import React, {useState} from 'react';

import {Card, Row} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import constants from "../../constants"

import util from "../../util/util";

import cartRequest from "../../requests/cartRequests";
import styles from './styles.module.css';
const {ACTION_ADD_TO_CART} = constants;





// function unescapeHTML(html) {
//     var escapeEl = document.createElement('div');
//     escapeEl.innerHTML = html;
//     return escapeEl;
// }

function VideoComponentFrame({children}) {
    return (
        <iframe width="560" height="315" src={children} title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
    )
}

function VideoComponent({children}) {
    return <div dangerouslySetInnerHTML={{__html: children}}/>;
}

export default function ProductView(props) {

    const {product, api} = props;
    const features = product.features;
    const [purchase, setPurchase] = useState(0);

    function changePurchase(event) {
        let value = parseInt(event.target.value);
        if (value < 0) {
            value = 0;
        }
        setPurchase(value);
    }

    function addToCart() {
        product.purchase = purchase;
        if (purchase <= 0) {
            alert("Vui lòng thêm số lượng sản phẩm")
        } else {
            let payload = {
                action: ACTION_ADD_TO_CART,
                data: product
            }
            cartRequest(payload);
            alert("Thêm vào giỏ hàng thành công")
            window.location.href = "/gio-hang";
        }
    }

    return (
        <div className="col-xs-12 col-12 col-md-8 col-lg-8 offset-md-2 offset-lg-2">
                <div className='row mb-5'>
                    <div className="col-xs-12 col-12 col-md-6">
                        <div className={styles.image}>
                            <img src={product.background !== "" ? api.concat("/blob/", product.background) :
                                          "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"}/>
                        </div>

                    </div>
                    <div className="col-xs-12 col-12 col-md-6">
                        <div className={styles.content}>
                            <h4>{product.label}</h4>
                            {/* <div className="line"/> */}
                            
                            {/* <div className="line"/> */}
                            {/* <label>Mô tả sản phẩm: </label> */}
                            <p className="">
                                {product.description}
                                Sử dụng 100% hạt Arabica: loại này dành cho những người yêu Cà phê thực thụ và muốn thưởng thức một ly Cà phê Arabica thuần tuý của vùng cao nguyên Việt Nam với vị chua thanh nhẹ nhàng. Cách ngon nhất để thưởng thức cà phê loại này là một tách cà phê kiểu Ý.
                            </p>
                            <div className={styles.price}>
                                <span className="">GIÁ:</span> <h4>{util.beautyNumber(product.promotion)} vnđ
                                    {product.price !== product.promotion
                                        ? (<small><del>{util.beautyNumber(product.price)} đ</del></small>)
                                        : (<></>)}</h4>
                            </div>
                            {/* <div className="line"/> */}
    
                            {/* <label>Số lượng</label>
                            <div className="input-group mb-3">
                                <input className="form-control" onChange={changePurchase} value={purchase} type="number"/>
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"> {product.unit === undefined ? "/ 1 sản phẩm" : "/ 1 " + product.unit} </span>
                                </div>
                            </div> */}
    
                            <button className="view-button" onClick={addToCart}><span>Đặt hàng</span></button>
                        </div>
                    </div>
                    {/* <div className="col-xs-12 col-12 col-md-12 mt-5">
                        <Card.Body className="justify-content-center">
                            <Card.Title align={"center"}>Thông Tin Chi Tiết</Card.Title>
                            <Card.Text>
                                {product.details}
                                <ul>
                                    <li>Thương hiệu: S-Premium</li>
                                    <li>Xuất xứ thương hiệu: Việt Nam</li>
                                    <li>Loại sản phẩm: Chuẩn</li>
                                    <li>Khối lượng tổng: 330ml</li>
                                </ul>
                            </Card.Text>
                            <div className="line"/>
                            <Card.Title align={"center"}>Mô Tả Sản Phẩm</Card.Title>
                            <Card.Text className="">
                                {
                                    features ? (<Features features={features}/>) :
                                        (
                                            <span>Không có nội dung</span>
                                        )
                                }
                            </Card.Text>
                            <div className="line"/>
                        </Card.Body>
                    </div> */}
                </div>
        </div>
    )
}

const Features = (props) => {
    const {features} = props;
    if (features.content.length === 0) {
        return (
            <div>No content</div>
        )
    } else {
        return (
            features.content.map((subContent) => {
                if (subContent.includes("#productvideo")) {
                    return (
                        <VideoComponentFrame>{subContent}</VideoComponentFrame>
                    )
                }
                if (subContent.includes("https://www.youtube.com/embed/") && subContent.includes("<iframe")) {
                    return (
                        <VideoComponent>{subContent}</VideoComponent>
                    )
                }
                return (
                    <ReactMarkdown key={subContent.sub(0, 10)}>{subContent}</ReactMarkdown>
                );
            })
        )
    }
}