import React from "react";

import MainContent from '../content/MainContent';
import Navbar from '../components/Header/Navbar';
import requests from '../requests';
import constants from "../constants";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: null
        }
    }

    async UNSAFE_componentWillMount() {
        let access_token = requests.getSessionStorage(constants.ACCESS_TOKEN);
        if (access_token) {
            this.setState({
                access_token: access_token
            })
        } else {
            this.setState({
                access_token: null
            });
        }
    }

    render() {
        return (
            <div className="g-sidenav-show  bg-gray-100">
                <div>
                    {/*<Sidebar />*/}
                    <div>
                        <Navbar/>
                        <MainContent/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;