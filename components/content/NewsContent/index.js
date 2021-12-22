import React, {useEffect, useState} from 'react';

import LoadingPage from "../../LoadingPage";
import styles from "./styles.module.css";

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
            <div className={`row ${styles.news}`} style={{marginBottom: "3rem"}}>
                <div className="container">
                    <h2 className='text-title'> Tin Tức </h2>
                </div>
                
                <div className={styles['news-content']}>
                    {
                        news.length !== 0 ? news.map(product => {
                            return (
                                <NewsCard api={api}
                                            key={product._id}
                                            product={product}
                                            DEFAULT_COLOR={DEFAULT_COLOR}
                                />
                            )
                        }) : (<div className="text-center"> Chưa có tin tức </div>)
                    }
                </div>
               <a href='#'>xem tất cả</a>
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}

function NewsCard(props) {
    const { api, product, DEFAULT_COLOR} = props;

    return (
        /**
         * image src logic:
         * src={product.background === ""
         *           ? "/null.jpg"
         *           : `${api}/blob/${product.background}`}
         * TO DO: set back src logic above.
         */ 
        <div className={styles['news-item']}>
            <div className={styles['news-img']}>
                <img src={product.background === ""
                         ? "/null.jpg"
                         : product.background} alt={product.description}/>
            </div>
            <div className={styles['news-text']}>
                <a href={"/tin-tuc/" + product.search_title}><h6>{product.label}</h6></a>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

module.exports = NewsContent;