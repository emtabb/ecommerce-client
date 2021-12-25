// import React, {useState} from 'react';

import {Card, Row} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'
import styles from "./styles.module.css";
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

export default function NewsDetailContent (props) {

    const {product, api, news} = props;
    const features = news.features;
    
    return (
        <div className="col-xs-12 col-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                <div className='row mb-5'>
                    <div className="col-xs-12 col-12 col-md-12">
                        <h1 className={styles.title}>{news.label}</h1>
                        <div className={styles.image}>
                            <img src={news.background !== "" ?
                                            news.background :
                                          "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"}/>
                                           {/* src={news.background !== "" ?
                                       api.concat("/blob/", news.background) :
                                          "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"} */}
                            <span>Hình ảnh: {news.description}</span>
                        </div> 
                    </div>
                    
                    <div className="col-xs-12 col-12 col-md-12 mb-5">
                            {/* <Card.Title align={"center"}>Thông Tin Chi Tiết</Card.Title> */}
                            <Card.Text className={styles.content}>
                                {
                                    features ? (<Features features={features}/>) :
                                        (
                                            <span>Không có nội dung</span>
                                        )
                                }
                            </Card.Text>
                            {/* <div className="line"/> */}
                    </div>
                </div>
        </div>
    )
}

const Features = (props) => {
    const {features} = props;
    if (!features.content)
    {
        return (
            <div>No content</div>
        )
    }

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