import React, {useEffect, useState} from 'react';

import LoadingPage from "../../LoadingPage";


function NewsContent(props) {

    const {api, DEFAULT_COLOR} = props;

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const styleNewsLabel = {
        borderBottom: "5px solid",
    }

    useEffect(() => {
        setNews(props.news);
        setLoading(true);

        return () => {
            setNews([]);
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="row" style={{marginBottom: "3rem"}}>
                <div className="container">
                    <h2 style={styleNewsLabel}> Tin Tức </h2>
                </div>
                <div className="mt-2 col-12 col-md-12 col-lg-12">
                    <div className="container-fluid">
                        <div className="row">
                            {
                                news.length !== 0 ? news.map(product => {
                                    return (
                                        <NewsCard api={api}
                                                  key={product._id}
                                                  product={product}
                                                  DEFAULT_COLOR={DEFAULT_COLOR}
                                        />
                                    )
                                }) : (<div className="text-center"> Hiện tại chưa có tin tức </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

function NewsCard(props) {
    const { api, product, DEFAULT_COLOR} = props;

    let borderRadius = "0.5rem";
    let cardSubStyleSheet = {
        borderRadius: borderRadius,
        height: "25rem",
        width: "15rem"
    }

    let cardImageSubStyleSheet = {
        borderRadius: borderRadius,
        width: "100%", objectFit: "cover",
        height: "15rem",
    }

    return (
        <div className="d-inline-block d-flex mr-3 ml-3 card" style={cardSubStyleSheet}>
            <img className="card-img-top"
                 style={cardImageSubStyleSheet}
                 src={product.background === ""
                     ? "/null.jpg"
                     : `${api}/blob/${product.background}`} alt={product.description}/>
            <div className="card-body flex-fill text-center">
                <a href={"/tin-tuc/" + product.search_title}><h6>{product.label}</h6></a>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

module.exports = NewsContent;