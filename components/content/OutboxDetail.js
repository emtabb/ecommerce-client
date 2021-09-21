import React from 'react';

import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

let borderRadius = "0.7rem";
let cardSubStyleSheet = {
    hover: "",
    background: "white",
    borderRadius: "2"
}

let cardImageSubStyleSheet = {
    width: "100%",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius
}

// function unescapeHTML(html) {
//     var escapeEl = document.createElement('div');
//     escapeEl.innerHTML = html;
//     return escapeEl;
// }

function VideoComponentFrame({ children }) {
    return (
        <iframe width="560" height="315" src={children} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
    )
}

function VideoComponent({ children }) {
    return <div dangerouslySetInnerHTML={{ __html: children }}></div>;
}

export default class OutboxDetail extends React.Component {
    constructor(props) {
        super(props);
        this.outbox = props.outbox;
    }

    render() {
        const outbox = this.outbox;
        const features = outbox.features;

        return (
            <div className="col-xs-12 col-12 col-md-9 col-lg-9 mt-4">
                <Card className="box shadow w-100 m-4 p-4" style={cardSubStyleSheet}>
                    <Card.Img variant="top" style={cardImageSubStyleSheet}
                        src={outbox.background ? `/blob/${outbox.background}` :
                            "https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"} />
                    <Card.Body>
                        <Card.Title><h3><strong>{outbox.label}</strong></h3></Card.Title>
                        <Card.Subtitle className="text-muted mb-5">{outbox.author}</Card.Subtitle>
                        <Card.Text className="p-4 m-4">
                            {
                                features.content !== undefined ?
                                    <Features features={features} />
                                    :
                                    (
                                        <span>Không có nội dung</span>
                                    )
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const Features = (props) => {
    const { features } = props;
    if (features.content.length === 0) {
        return (
            <div>No content</div>
        )
    }
    else {
        return (
            features.content.map(subContent => {
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
                    <ReactMarkdown key>{subContent}</ReactMarkdown>
                );
            })
        )
    }
} 