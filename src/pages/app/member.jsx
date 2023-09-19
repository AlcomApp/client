import React from "react";
import { MemberTableComponent } from "../../components/table";
import "../../styles/app/member.css";


export class MemberView extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="member page">
            <div className="body">
                <MemberTableComponent
                members={this.props.members}
                />
            </div>
        </div>
        </>)
    }
}