import React, {useEffect, useState} from 'react';

import LoadingPage from "../../LoadingPage";
import NewsCard from './NewsCard';
import styles from "./styles.module.css";

function NewsContent(props) {

    const {api, DEFAULT_COLOR} = props;

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

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
            </div>
        )
    } else {
        return (<LoadingPage />)
    }
}



module.exports = NewsContent;