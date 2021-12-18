import React from 'react';

import CreateForm from '../content/CreateForm';
import Footer from '../components/Footer';
import Navbar from '../components/Header/Navbar';
import Sidebar from '../components/Sidebar';
import requests from '../requests';
import constants from '../constants';
import util from '../util/util';

const SPACE_NAME = "baotranstore";

export default class CreateProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.product_code = util.parseQuery(props.location.search).product_code;
        console.log(this.product_code);
        this.state = {
            fields : [],
            product: null
        }
    }

    async UNSAFE_componentWillMount() {
        if (util.notNull(this.product_code)) {
            console.log("product code")
            let responseProduct = await requests.getData(`/api/loadspace/product?space=${SPACE_NAME}&product_code=${this.product_code}`)
            this.setState({
                product: responseProduct.space[0]
            });
        }
        let responseFields = await requests.getData(`/api/space/space-structure/manager/create-form`, constants.ACCESS_TOKEN)
        this.setState({
            fields: responseFields.createForm
        }); 
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <div id="content" className="container-fluid">
                    <Navbar />
                    {this.state.fields.length !== 0 ? (<CreateForm fields={this.state.fields} product={this.state.product} />) : (<div></div>)}
                </div>  
            </div>
        )
    }
}