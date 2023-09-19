import React from "react";
import { Check, Plus, Trash, X } from "react-bootstrap-icons";
import { TaskComponent } from "../../../components/task";
import { Checkbox } from "../../../interface/interface";

import "../../../styles/app/project/task.css";
import "../../../styles/modal.css";

export default class TaskView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_open: false,
        }
    }

    render = () => {
        return (<>
        <div className="task page">
            <div className="body">
                <TaskComponent
                sheets={this.props.task_sheets}

                dragStart={(sheet_id, task_id) => {this.props.dragStart(sheet_id, task_id)}}
                dragEnd={(sheet_id) => {this.props.dragEnd(sheet_id)}}
                sheetHover={(sheet_id) => {this.props.sheetHover(sheet_id)}}
                createTask={(sheet_id) => {this.props.createTask(sheet_id)}}
                createSheet={() => {this.props.createSheet()}}

                deleteSheet={(sheet_id) => {this.props.deleteSheet(sheet_id)}}
                changeSheetName={(sheet_id, name) => {this.props.changeSheetName(sheet_id, name)}}
                switchReadOnly={(sheet_id) => {this.props.switchReadOnly(sheet_id)}}
                openTodo={(sheet_id, task_id) => {
                    this.props.openTodo(sheet_id, task_id);
                    this.setState({is_open: true});
                }}
                />
                <TodoModal 
                is_open={this.state.is_open} 
                task={this.props.focus_task} 
                close={() => {this.setState({is_open: false});}}
                createTodo={() => {this.props.createTodo()}}
                deleteTodo={(todo_id) => {this.props.deleteTodo(todo_id);}}
                checkTodoItem={(task_id, todo_id) => {this.props.checkTodoItem(task_id, todo_id)}}
                changeTaskName={(task_id, name) => {this.props.changeTaskName(task_id, name)}}
                changeItemName={(task_id, item_id, name) => {this.props.changeItemName(task_id, item_id, name)}}
                />
            </div>
        </div>
        </>)
    }
}


export class TodoModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        {this.props.is_open ? (<>
            <div className="modal-background">
            <div className="todo-modal modal fadein">
                <div className="header">
                    <button onClick={() => {this.props.close()}} className="close"><X/></button>
                </div>
                <div className="body">
                    <div className="todo-modal-head">
                        <p className="title"><input type="text" className="title" onChange={(e) => {this.props.changeTaskName(this.props.task.id, e.target.value)}} value={this.props.task.name}/></p>
                        <div className="create-area"><button onClick={() => {this.props.createTodo()}} className="create-todo green_hover"><Plus/>Create Todo</button></div>

                    </div>
                    <div className="todo-modal-body">
                        <ul>
                            {this.props.task.todo ? this.props.task.todo.map((item) => {
                                return (<>
                                <li>
                                <div className="check-area"><Checkbox onChange={() => {this.props.checkTodoItem(this.props.task.id, item.id)}} state={item.is_checked}/></div>
                                <div className="text-area">
                                    <input type="text" onChange={(e) => {this.props.changeItemName(this.props.task.id, item.id, e.target.value)}} value={item.name}/>
                                </div>
                                <div className="delete-area">
                                    <button onClick={() => {this.props.deleteTodo(item.id)}} className="delete green_hover">
                                        <Trash/>Delete
                                    </button>
                                </div>
                            </li>
                                </>)
                            }): <></> }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>): (<></>)}
        
        </>)
    }
}