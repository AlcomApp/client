import React from "react";
import "../styles/components/table.css";
import {ArrowRightSquare, CardChecklist, Check, ClipboardCheck, FileEarmark, People, Person, Tag} from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import { CustomInterface } from "../interface/interface";

export class ProjectTableComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (<>
        <table className="project-table">
            <thead>
                <tr>
                    <td><p className="title">All Projects</p></td>
                </tr>
                <tr>
                    <td><span className="icon"><Tag/></span><p className="title">Name</p></td>
                    <td><span className="icon"><People/></span><p className="title">Member</p></td>
                    <td><span className="icon"><FileEarmark/></span><p className="title">State</p></td>
                    <td><span className="icon"><CardChecklist/></span><p className="title">Progress</p></td>
                </tr>
            </thead>
            <tbody>
                {this.props.projects.map((item) => {
                    let state = <></>
                    switch(item.state){
                        case 0:
                            state = <span className="state running">RUNNING</span>
                            break;
                        case 1:
                            state = <span className="state ready">READY</span>
                            break;
                    }

                    return (<>
                    <tr>
                        <td>
                            <p className="name">{item.name}</p>
                            <Link to="project/" className="open-project green_hover"><ArrowRightSquare/>OPEN</Link>
                        </td>
                        <td>
                            {item.members.map((member) => {return (<><span className="icon"></span></>)})}
                        </td>
                        <td>
                            {state}
                        </td>
                        <td>
                            <CustomInterface
                            className={"progress"}
                            title={`${item.progress * 100}%`}
                            element={<>
                            <div className="progress-bar">
                                <div className="gage" style={{width: `${item.progress * 100}%`}}></div> 
                            </div>
                            </>}
                            />
                        </td>
                    </tr>
                    </>)
                })}
            </tbody>
        </table>
        </>)
    }
}




export class MemberTableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <table className="member-table">
            <thead>
                <tr>
                    <td><p className="title">All Members</p></td>
                </tr>
                <tr>
                    <td><span className="icon"><Person/></span><p className="title">Name</p></td>
                    <td><span className="icon"><Check/></span><p className="title">State</p></td>
                    <td><span className="icon"><People/></span><p className="title">Depertment</p></td>
                    <td><span className="icon"><ClipboardCheck/></span><p className="title">Job title</p></td>
                </tr>
            </thead>
            <tbody>
                {this.props.members.map((member) => {
                    let state = <></>
                    switch(member.state.id) {
                        case 0:
                            state = <span className="state active">ACTIVE</span>
                    }
                    return (<>
                    <tr>
                        <td>{member.icon}<p className="name">{member.name}</p></td>
                        <td>
                            {state}
                        </td>
                        <td>
                            <p className="name">{member.depertment}</p>
                        </td>
                        <td>
                            <p className="name">{member.job_name}</p>
                            <Link className="open-chat green_hover">Chat</Link>
                        </td>
                    </tr>
                    </>)
                })}
            </tbody>
        </table>
        </>)
    }
}