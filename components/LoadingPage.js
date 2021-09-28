import React from 'react';

function LoadingPage() {

    return (
        <div className="container">
            <div className="row m-5 p-5 col-auto justify-content-center">
                <div className="" style={styles}>

                </div>
            </div>
        </div>
    )
}

const styles = {
    border: "16px solid #f3f3f3",
    borderTop: "16px solid #3498db",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    animation: "spin 1s linear infinite",
};

export default LoadingPage;