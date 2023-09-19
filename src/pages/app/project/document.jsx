import React from "react";
import { DocumentTableComponent } from "../../../components/document";
import "../../../styles/app/project/document.css";

export default class DocumentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="document page">
            <div className="body">
                <DocumentTableComponent documents={this.props.documents}/>
            </div>
        </div>
        </>)
    }
}