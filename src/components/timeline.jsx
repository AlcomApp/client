import React from "react";
import "../styles/components/timeline.css";
import {CaretRight, CaretLeft, People, Plus} from "react-bootstrap-icons"
export class TimelineComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <table className="timeline-table">
            <thead>
                <tr>
                    <td><p className="title">Timeline</p></td>
                    <td className="widget"><button  onClick={() => {this.props.onBack()}}className="green_hover"><CaretLeft/></button><p className="label">{this.props.timeline.weekly_labels[0]}~{this.props.timeline.weekly_labels[6]}</p><button className="green_hover" onClick={() => {this.props.onFollow()}}><CaretRight/></button> </td>
                </tr>
                <tr>
                    <td><span className="icon"><People/> </span><p className="title">User</p></td>
                    {this.props.timeline.weekly_labels.map((date) => {
                        return (<>
                        <td><p className="label">{date}</p></td>
                        </>)
                    })}
                </tr>
            </thead>
            <tbody>
                {this.props.timeline.dataset.map((data, i) => {
                    console.log(data)
                    return (
                        <>
                        <tr>
                            <td><p className="name">{data.name}</p>{!i?(<><button className="task-create green_hover"><Plus/>Create</button></>):(<></>)}</td>
                            <td>
                                {data.weekly_tasks.map((bar) => {
                                    return (<>
                                    <span className="task-row">
                                        {bar.map((task) => {
                                            if(task.name) {
                                                if(task.length < 1){
                                                    return <span className="task-bar">{task.name}</span>
                                                 } else {
                                                    return <span style={{width: `${120 * task.length}px`}} className="task-bar"><p className="task-name">{task.name}</p></span>
                                                 }
                                             } else {
                                                 return <span className="task-brank"></span>
                                             }
                                             
                                        })}
                                         {/*[...Array(8 - bar.length)].map((item) => {
                                        return (<span className="task-brank"></span>)})*/}
                                    </span>
                                   
                                    </>)
                                   
                                })}
                               
                            </td>
                           
                        </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
        </>)
    }
}