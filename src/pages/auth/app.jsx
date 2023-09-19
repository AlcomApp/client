import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginView } from "./login";

import "../../styles/auth/app.css";


export class AuthenticationView extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="auth-view">
            <div className="auth-display"></div>
            <Routes>
                <Route exact path="login/" element={<LoginView/>}/>
                <Route exact path="signup"/>
            </Routes>
        </div>
        </>)
    }
}