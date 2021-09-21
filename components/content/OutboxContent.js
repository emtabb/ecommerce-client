import React from 'react';

export default function OutboxContent(props)  {

    const space_name = props.space_name;

    return (<></>

    )
}

function OutboxColumnView(props) {
    const { data, field } = props;
    if (field.key === "_id") {
        return <></>;
    } else if (field.key === "background") {
        return <td><img src={`/blob/`.concat(data[field.key])} style={{width: "5.5rem", objectFit: "contain"}}/></td>;
    } 
    else {
        return <td>{data[field.key]}</td>;
    }
}