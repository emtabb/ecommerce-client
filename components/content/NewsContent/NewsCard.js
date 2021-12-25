import React from 'react';
import styles from "./styles.module.css";
import Link from "next/link";
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
            
            <Link href={"/tin-tuc/" + product.search_title}>
                <div className={styles['news-img']}>
                        <img src={product.background === ""
                                ? "/null.jpg"
                                : product.background} alt={product.description}/>
                </div>
            </Link>
            <div className={styles['news-text']}>
                <Link href={"/tin-tuc/" + product.search_title}><a><h6>{product.label}</h6></a></Link>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default NewsCard
