import React from "react";
import { CustomInterface } from "../../interface/interface";
import "../../styles/auth/login.css";

export class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="login-view">
            <h2>LOGIN</h2>
            <div className="widget">
                <CustomInterface className="login-id" title="LOGIN ID" element={<input type="email"/>}/>
                <CustomInterface className="password" title="PASSWORD" element={<input type="password"/>}/>
            </div>
            <button className="login-button">
                LOGIN
            </button>
        </div>
        
        </>)
    }
}