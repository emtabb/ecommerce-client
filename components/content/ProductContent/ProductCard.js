import Link from 'next/link';
import styles from "./styles.module.css";

function ProductCard(props) {
    const {cartAction, api, product, DEFAULT_COLOR} = props;

    function addProductToCart() {
        product.purchase = 1;
        if (cartAction(product).length !== 0) {
            alert("Thêm sản phẩm vô thành công");
        }
    }
    return (
        <div className={styles.card}>
            <Link href={"/san-pham/" + product.search_title}>
                <div className={styles.cardImage}>
                    <img
                            src={product.background === ""
                                ? "/null.jpg"
                                : `${api}/blob/${product.background}`} alt={product.description}/>
                </div>
            </Link>
            <div className={styles['text-drink']}>
                <Link href={"/san-pham/" + product.search_title}><a><h6 className='text-center'>{product.label}</h6></a></Link>
            </div>
            {props.showPrice ? 
            <>
                <div className={styles.price}>
                    {`${(product.promotion ? product.promotion : product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}vnđ`}
                </div> 
                <div className="">
                    <button onClick={addProductToCart}  className='view-button'><span>đặt hàng</span></button>
                </div>
            </>
        : null}
            

        </div>
    )
}

export default ProductCard
