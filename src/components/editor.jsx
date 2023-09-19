import React from "react";
import "../styles/components/editor.css";
import ReactMarkDown from "react-markdown"

import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Code, Link, ListOl, ListUl, Tag, TypeH1, TypeH2, TypeH3 } from "react-bootstrap-icons";
import { Dropdown, MarkdownEditor } from "../interface/interface";



const language_list = [
    {title: "JavaScript", value: "javascript"},
    {title: "Python3", value: "python"},
    {title: "Java", value: "java"},
    {title: "PHP", value: "php"},
    {title: "Swift", value: "swift"},
    {title: "C++", value: "cpp"},

]


export class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_composition: false,
            selected_language: {}
        }
    }


    insertBlock = (type) => {
        const area = document.getElementById("md-textarea");
        area.value = area.value.substr(0, area.selectionStart) + `${type}\n` + area.value.substr(area.selectionStart)
        this.props.contentChange(area.value)
    }

    insertInline = (type) => {
        const area = document.getElementById("md-textarea");
        area.value = area.value.substr(0, area.selectionStart) + `${type}` + area.value.substr(area.selectionStart)
        this.props.contentChange(area.value)
    }

    render = () => {
        
        return (<>
        <div className="editor-component">
            <div className="widget-area">
                <button 
                className="square-button green_hover"
                onClick={() => {this.insertBlock("# header 1")}}>
                    <TypeH1/>
                </button>
                <button
                className="square-button green_hover"
                onClick={() => {this.insertBlock("## header 2")}}>
                    <TypeH2/>
                </button>
                <button
                className="square-button green_hover"
                onClick={() => {this.insertBlock("### header 3")}}>
                    <TypeH3/>
                </button>
                <button
                className="square-button green_hover"
                onClick={() => {this.insertBlock("- item1\n- item2 \n- item3")}}>
                    <ListUl/>
                </button>
                <button
                className="square-button green_hover"
                onClick={() => {this.insertBlock("1. item2\n1. item2\n1. item3")}}>
                    <ListOl/>
                </button>
                <button
                className="square-button green_hover"
                onClick={() => {this.insertInline("[Website](https://example.com)")}}
                >
                    <Link/>
                </button>
                <button 
                className="square-button green_hover"
                onClick={() =>{this.insertInline("``` write code here ```")}}>
                    <Code/>    
                </button> 
                
                <Dropdown 
                onChange={(item) => {
                    this.insertBlock("```" + `${item.value}\nWrite code here \n` + "```")
                    this.setState({selected_language: item})
                }}
                display={this.state.selected_language.title} 
                items={language_list}/>
            </div>
            <div className="text-area">
                <MarkdownEditor 
                id="md-textarea"
                value={this.props.document.content}
                onChange={(e) => this.props.contentChange(e.target.value)}
                />
            </div>
        </div>
        </>)
    }
}

export class PreviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="preview-component">
            <ReactMarkDown
             children={this.props.content}
             components={{
               code({node, inline, className, children, ...props}) {
                 const match = /language-(\w+)/.exec(className || '')
                 return !inline && match ? (
                   <SyntaxHighlighter
                     {...props}
                     children={String(children).replace(/\n$/, '')}
                     style={prism}
                     language={match[1]}
                     PreTag="div"
                   />
                 ) : (
                   <code {...props} className={className}>
                     {children}
                   </code>
                 )
               }
             }}/>
        </div>
        </>)
    }
}