import React from "react";
import { ArrowUpRightSquare, List, Pen, Plus, Trash } from "react-bootstrap-icons";
import "../styles/components/task.css";

export class TaskComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (<>
        <div className="task-component">
            <div className="header">
                <p className="title">All Task sheets</p>
                <button onClick={() => {this.props.createSheet();}} className="create-sheet green_hover"><span className="icon"><Plus/></span>Create sheet</button>
            </div>
            <div className="body">
            {this.props.sheets? this.props.sheets.map((sheet, i) => {
                        return (<>
                        <SheetComponent
                        tasks={sheet.tasks}
                        name={sheet.name}
                        id={sheet.id}
                        index={i}
                        readOnly={sheet.readonly}
                        
                        deleteSheet={() => {this.props.deleteSheet(sheet.id);}}
                        switchReadOnly={() => {this.props.switchReadOnly(sheet.id)}}
                        dragStart={(task_id) => {this.props.dragStart(sheet.id, task_id)}}
                        dragEnd={() => {this.props.dragEnd(sheet.id)}}
                        sheetHover={() => {this.props.sheetHover(sheet.id)}}
                        createTask={() => {this.props.createTask(sheet.id)}}
                        changeSheetName={(value) => {this.props.changeSheetName(sheet.id, value)}}
                        openTodo={(task_id) => {this.props.openTodo(sheet.id, task_id)}}
                        />
                        </>)
                    }): (<></>)}
            </div>
        </div>
        </>)
        
    }
}


export class SheetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_compotition: false,
        };
    }
    render = () => {
        return (<>
        <div className="sheet">
            <p className="title">
            <button onClick={() => {this.props.switchReadOnly();}} className="change-edit green_hover"><Pen/></button>
            <input 
            onCompositionStart={() => {this.setState({is_compotition: true})}}
            onCompositionEnd={() => {this.setState({is_compotition: false})}}
            onKeyDown ={(e) => {
                if(e.key == "Enter" && !this.state.is_compotition){
                    e.target.blur()
                    this.props.switchReadOnly()
                }
            }}
            readOnly={this.props.readOnly} 
            id={`input-${this.props.id}`} 
            className="title" type="text"
            value={this.props.name} 
            onChange={(e)=>{this.props.changeSheetName(e.target.value)}}/>
            <button onClick={() => {this.props.deleteSheet()}} className="delete-sheet green_hover"><Trash/></button>
            </p>
            <div className="container" onDragOver={(e) => {e.preventDefault()}} onDragEnter={() => {this.props.sheetHover()}}>
                {this.props.tasks.map((task) => {
                    return (<>
                    <TaskItemComponent
                    name={task.name}
                    dragStart={() => {this.props.dragStart(task.id)}}
                    dragEnd={() => {this.props.dragEnd()}}
                    openTodo={() => {this.props.openTodo(task.id)}}
                    />
                    </>)
                })}
            </div>
            <button onClick={() => {this.props.createTask()}} className="create-task"><Plus/>Create task</button>
        </div>        
        </>)
    }
}


export class TaskItemComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (<>
        <div className="task" draggable={true} onDragEnd={(e) => {this.props.dragEnd()}} onDragStart={() => {this.props.dragStart()}}>
            <span className="icon">
                <List/>
            </span>
            <p className="name">{this.props.name}</p>
            <button onClick={() => {this.props.openTodo()}} className="open green_hover"><ArrowUpRightSquare/>OPEN</button>
        </div>
        </>)
    }
}