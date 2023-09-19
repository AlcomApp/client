import React from "react";

import {People, FileCode, CalendarRange, ChatDots, ListTask, Book} from "react-bootstrap-icons"
import { Link } from "react-router-dom";
import "../styles/components/menu.css";
import "../styles/animation.css";

const menu_items = [
    {
        id: 0,
        icon: <FileCode/>,
        name: "Project",
        link: "/",
        is_clicked: false
    },
    {
        id: 1,
        icon: <People/>,
        name: "Member",
        link: "/member/",
        is_clicked: false
    },
    {
        id: 2,
        icon: <ChatDots/>,
        name: "Chat",
        link: "/chat/",
        is_clicked: false
    }
]

export class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount = () => {
        menu_items[0].is_clicked = true;
        this.setState({items: menu_items})
    }

    onClick = (id) => {
        const items = this.state.items.map((item) => {
            item.is_clicked = false;
            if(item.id === id) {
                item.is_clicked = !item.is_clicked;
                return item;
            } else {
                return item;
            }
        })
        this.setState({ items: items})
    }

    render = () => {
        return (<>
        <div className="main-menu">
            <div className="body">
                <ul>
                    {this.state.items.map((item) => {
                        return (<>
                        <li>
                            <Link onClick={() => {this.onClick(item.id)}} to={item.link} className={`${item.is_clicked? "clicked": "unclicked"} green_hover`}>
                                <span className="icon">{item.icon}</span>
                                <span className="name">{item.name}</span>
                            </Link>
                        </li>
                        </>)
                    })}
                </ul>
            </div>
        </div>
        </>)
    }
}



const project_menu_items = [
    {
        id: 0,
        icon: <CalendarRange/>,
        name: "Timeline",
        link: "/project/",
        is_clicked: false,
    },
    {
        id: 1,
        icon: <ListTask/>,
        name: "Task",
        link: "/project/task/",
        is_clicked: false,
    },
    {
        id: 2,
        icon: <Book/>,
        name: "Document",
        link: "/project/document/",
        is_clicked: false,
    }
]


export class ProjectMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount = () => {
        project_menu_items[0].is_clicked = true;
        this.setState({items: project_menu_items})
    }

    onClick = (id) => {
        const items = this.state.items.map((item) => {
            item.is_clicked = false;
            if(item.id === id) {
                item.is_clicked = !item.is_clicked;
                return item;
            } else {
                return item;
            }
        })
        this.setState({ items: items})
    }

    

    render = () => {
        return (<>
        <div className="project-menu">
            <div className="body">
                <ul>
                {this.state.items.map((item) => {
                    return (<>
                    <li>
                        <Link onClick={() => {this.onClick(item.id)}} to={item.link} className={`${item.is_clicked? "clicked": "unclicked"} green_hover`}>
                            <span className="icon">{item.icon}</span>
                            <span className="name">{item.name}</span>
                        </Link>
                    </li>
                    </>)})}
                </ul>
            </div>
        </div>
        </>)
    }
}