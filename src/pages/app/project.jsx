import React from "react";
import { ProjectTableComponent } from "../../components/table";
import "../../styles/common.css";
import "../../styles/app/project.css";


export default class ProjectView extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (<>
        <div className="project page">
            <div className="body">
                <ProjectTableComponent projects={this.props.projects}/>
                
            </div>
        </div>
        </>)
    }
}