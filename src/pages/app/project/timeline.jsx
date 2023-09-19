import React from "react";
import { TimelineComponent } from "../../../components/timeline";
import "../../../styles/app/project/timeline.css";
export default class TimelineView extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="timeline page">
            <div className="body">
                <TimelineComponent 
                timeline={this.props.timeline}

                onFollow={() => {this.props.onFollowDate()}}
                onBack={() => {this.props.onBackDate()}}
                />
            </div>
        </div>
        </>)
    }
}