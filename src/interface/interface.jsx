import React from "react"
import { CaretDown, CaretDownFill, Check, Markdown } from "react-bootstrap-icons"
import { parse_markdown } from "../module/common"
import "../styles/interface/interface.css"



export class CustomInterface extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
         <div className={`${this.props.className} custom-interface`}>
            <span className="title">{this.props.title}</span>
            <div className="body">
                {this.props.element}
            </div>
        </div>
        </>)
       
    }
}



export class Checkbox extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<>
        <button onClick={() => {this.props.onChange(!this.props.state)}} className={`checkbox ${this.props.state?"checked": "unchecked"}`}>
            {this.props.state ? <Check/>: <></>}
        </button>
        </>)
    }
}


export class Toggle extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (<>
        <div className={`${this.props.className} toggle`}>
            <div className={`background ${this.props.state ? "unactive": "active"}`}></div>
            <button onClick={(e) => this.props.onChange(e)} className={`switch ${this.props.state ? "unactive": "active"}`}>
                <Markdown/>
            </button>
        </div>
        </>)
    }
}


export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_open: false,
        }
    }

    render = () => {
        return(<>
        <div className="dropdown">
            <div className="head">
                <p>{this.props.display}</p>
                <button className={this.state.is_open? "rotate_right": "rotate_left"} onClick={(e) => {this.setState({ is_open:!this.state.is_open})}}>
                    <CaretDownFill/>
                </button>
            </div>
            {this.state.is_open? (<>
                <div className="dropdown-body">
                <ul>
                    {this.props.items.map((item) => {
                        return (<>
                        <li>
                        <button onClick={() => {
                            this.props.onChange(item)
                            this.setState({ is_open:false})
                        }}className=" item gray_hover">
                            {item.title}
                        </button>
                        </li>
                        </>)
                    })}
                </ul>
            </div>
            </>):(<></>)}
            
        </div>
        </>)
    }
}



export class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_composition: false,
        }
    }

    render = () => {
        const lines = this.props.value.split("\n").length + 1
        return (<>
        <div className="mdeditor-component">
            <div className="linenumbers">
            {this.props.value.split("\n").map((index, i) => {
                    return <span className="linenumber">{i+1}</span>
            })}
            </div>
            <div 
            style={{height:  `${lines * 16}px`}}
            className="md-editor">
            <div className="view" dangerouslySetInnerHTML={{__html: parse_markdown(this.props.value? this.props.value: "")}}></div>
            <textarea 
            id={this.props.id}
            className="md-textarea"
            onKeyDown={(e) => {
                if(e.key == "Enter" && !this.state.is_composition){

                }
            }}
            onCompositionStart={() => {this.setState({is_composition: true})}}
            onCompositionEnd={() => {this.setState({is_composition: false})}}
            onChange={(e) => {this.props.onChange(e)}}
            value={this.props.value}>
                
            </textarea>
            </div>
            
        </div>
        </>)
    }
}