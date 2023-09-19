import React from "react";
import { EditorComponent, PreviewComponent } from "../../../components/editor";
import { CustomInterface, Toggle } from "../../../interface/interface";
import "../../../styles/app/project/editor.css";
import ReactDOM from 'react-dom/client'

const test_document = {
    id: "xxxxxx",
    name: "Test Document",
    content: ""
}


export default class DocumentEditorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_edit: false,
            document: {
                id: "",
                name: "",
                content: "",
            }
        }
    }

    componentDidMount = () => {
        this.setState({document: test_document});
    }

    contentChange = (value) => {
        const root = document.getElementById("md-textarea") 
        console.log(value)
        const target_document = this.state.document 
        target_document.content = value
        this.setState({document: target_document});

    }


    render = () => {
        return (<>
        <div className="editor">
            <div className="header">
                <div className="left-items">
                    <CustomInterface title="Document Title" element={<input className="document-name" type="text"/>}/>
                </div>
                <div className="right-items">
                <button className="note-commit green_hover">COMMIT</button>
                <Toggle className="md-switch" state={this.state.is_edit} onChange={() => {this.setState({is_edit: !this.state.is_edit})}}/>

                </div>
                
               
            </div>
            <div className="body">
                {!this.state.is_edit ? (<>
                <EditorComponent
                     document={this.state.document}
                     contentChange={(value) => {this.contentChange(value)}}
                     />
                </>):(<>
                <PreviewComponent content={this.state.document.content}/>
                </>)}
            </div>
        </div>
        </>)
    }

}