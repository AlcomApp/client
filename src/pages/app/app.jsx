import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainMenu } from "../../components/menu";
import "../../styles/app/app.css";
import { MemberView } from "./member";
import ProjectView from "./project";
import ProjectAppView from "./project/app";

const test_project_data = [
    {
        name: "Test Project",
        members: [],
        //state.name = ["RUNNING", "READY", "WAITING", "COMPLETED", ""]
        state: 0,
        progress: 0.10
    },
    {
        name: "Test Project",
        members: [],
        state: 1,
        progress: 0.25
    }
]

const test_member_data = [
    {
        icon: "",
        name: "Test User",
        state: {id: 0, name: "ACTIVE"},
        job_name: "SoftwareEngineer",
        depertment: "Development",
    }
]


export default class AppView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            members: [],
        }
    }



    componentDidMount = () => {
        this.setState({
            projects: test_project_data,
            members: test_member_data
        })
    }


    render = () => {
        return (<>
         <div className="app">
             <div className="app-header">

             </div>
             <div className="app-body">
                <MainMenu/>
                <Routes>
                    <Route exact path="/*" element={<ProjectView
                    projects={this.state.projects}
                    />}/>
                    <Route exact path="member/" element={<MemberView
                    members={this.state.members}
                    />}/>
                    <Route exact path="project/*" element={<ProjectAppView/>}/>
                </Routes>
            </div>
        </div>
        </>)
    }
}