import React from "react";
import { ArrowRightSquare, CalendarDate, Person, Plus, Tag } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../styles/components/document.css"
export class DocumentTableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <table className="document-table">
            <thead>
                <tr>
                    <td><p className="title">All documents</p></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <span className="icon"><Tag/></span>
                        <p className="title">Title</p>
                    </td>
                    <td>
                        <span className="icon"> <Person/></span>
                       <p className="title">Author</p>
                    </td>
                    <td><span className="icon"><CalendarDate/></span>
                    <p className="title">Published at</p>
                    </td>
                    <td>
                        <Link to={"edit/"} className="document-create green_hover">
                            <Plus/>Create
                        </Link>
                    </td>
                </tr>
            </thead>
            <tbody>
                {this.props.documents.map((document) => {
                    return (<>
                    <tr>
                        <td>
                            <p className="name"> {document.name}</p>   
                        </td>
                        <td>
                            <p className="name">{document.author}</p>
                        </td>
                        <td>
                            <p className="name">{document.created_at}</p>
                        </td>
                        <td>
                            <Link className="document-open green_hover">
                                <ArrowRightSquare/>
                                OPEN
                            </Link>
                        </td>
                    </tr>
                    </>)
                })}
            </tbody>
        </table>
        </>)
    }
}