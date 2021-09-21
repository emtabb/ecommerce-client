import React from 'react';

const FigureComponent = (props) => {
    const { style, src, text, notification , textColor } = props;
    style.objectFit = "contain";
    return (
        <>
            <figure className="figure" style={style}  >
                <img src={src} className="figure-img img-fluid rounded-circle" />
            </figure>
            <figcaption className={"figure-caption text-align-center mt-3 ".concat(textColor === undefined ? "text-dark" : textColor) }>
                {text}
                {
                    notification !== undefined && notification != null ?
                        <span className="badge badge-pill badge-danger">{notification}</span> : <></>
                }
            </figcaption>
        </>
        );
}

export default FigureComponent;