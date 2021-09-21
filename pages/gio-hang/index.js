import React from 'react';
import CartContent from "../../components/content/CartContent";
import Navbar from "../../components/Navbar";

export default function Cart({api, space}) {
    console.log(api);
    return (
        <div className="bg-gray-100">
            <div>
                <Navbar/>
                <div className="container">
                    <CartContent api={api} space={space} />
                </div>
            </div>
        </div>
    )

}

export async function getStaticProps() {
    const api = process.env.ESPACE_API;
    const space = process.env.SPACE_NAME;
    return {
        props: {
            api,
            space,
        }
    }
}