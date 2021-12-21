import React from "react";

function NewCard(props) {
    const cardHeight = 22;
    const cardImageHeight = cardHeight * 60/100;
    const { api, product } = props;

    let borderRadius = "0.5rem";
    let cardSubStyleSheet = {
        borderRadiusTop: borderRadius,
        height: `${cardHeight}em`,
        paddingLeft: 0,
        paddingRight: 0,
        width: "16rem"
    }

    let cardImageSubStyleSheet = {
        borderRadiusTop: borderRadius,
        width: "100%", objectFit: "cover",
        height: `${cardImageHeight}em`,
    }

    return (
        <div className="col-12 col-md-3 d-inline-block d-flex m-2 card shadow" style={cardSubStyleSheet}>
            <img className="card-img-top"
                 style={cardImageSubStyleSheet}
                 src={product.background === ""
                     ? "/null.jpg"
                     : `${api}/blob/${product.background}`} alt={product.description}/>
            <div className="card-body flex-fill">
                <a href={"/tin-tuc/" + product.search_title}><h6>{product.label}</h6></a>
                <p className="mt-2">{product.description}</p>
            </div>
        </div>
    )
}


export default NewCard;