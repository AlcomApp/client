import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProjectMenu } from "../../../components/menu";
import { Sheet, Task, Todo } from "../../../module/task";
import { Timeline } from "../../../module/timeline";
import "../../../styles/app/project/app.css";
import DocumentView from "./document";
import DocumentEditorView from "./editor";
import TaskView from "./task";
import TimelineView from "./timeline";



const test_user_data = [
    {
        id: 0,
        name: "Test User",

    },
    {
        id: 1,
        name: "Test User"
    }
]



const test_task_sheet_data = [
    {
        id: "xxxxx",
        name: "Todo",
        readonly: true,
        tasks: [
            {
                id: "zzzzz",
                user_id: 0,
                name: "Environment Test1",
                start_at: "2023-09-10",
                end_at: "2023-09-13",
                todo: [
                    {id: "xxx-yyyy", name: "Post testDataA", is_checked: false}
                ]
            }
        ]
    },
    {
        id: "yyyy",
        name: "Progressing",
        readonly: true,
        tasks: [
            {
                id: "xxxx",
                user_id: 1,
                start_at: "2023-09-13",
                end_at: "2023-09-14",
               
                name: "Environment Test2",
                todo: [
                    {id: "xxx-yyyy", name: "Post testDataB", is_checked: false}
                ]
            }
        ]
    },
    {
        id: "zzzzz",
        name: "Completed",
        readonly: true,
        tasks: [
            { 
                id: "yyyy",
                user_id: 0,
                start_at: "2023-09-15",
                end_at: "2023-09-21",     
                name: "Environment Test3",
                todo: [
                    {id: "xxx-yyyy", name: "Post testData", is_checked: false},
                ]
            }
        ]
    }
]


const test_document_data = [
    {
        id: "xxxx",
        name: "Test Document",
        author: "Test user",
        created_at: "2015-xx-xx"
    },
    {
        if: "yyyy",
        name: "Test Document",
        author: "Test user",
        created_at: "2015-xx-xx"
    }
]

export default class ProjectAppView extends React.Component {
    constructor(props) {
        super(props);
        this.hovering_sheet = ""
        this.grabbing_task = {}
        this.from_sheet = {}
        this.state = {
            timeline: {
                weekly_labels: [],
                dataset: []
            },
            task_sheets: [],
            focus_task: {},
            focus_sheet: {},
            users: [],
            documents: []
        }
    }

    componentDidMount = () => {
       // Timeline

        //Date 
        const weekly_dates = [];
        const date = new Date();
        //test data
        const users = test_user_data
        const task_sheet_data = test_task_sheet_data

        weekly_dates.push(date.toLocaleDateString())
        for(let i = 0; i < 6; i++) {
            date.setDate(date.getDate() + 1)
            weekly_dates.push(date.toLocaleDateString())
        }
        const timeline = new Timeline([], null)
        const weekly_tasks = timeline.parse(task_sheet_data, weekly_dates[0], weekly_dates[6])
        const dataset = {
            weekly_labels: weekly_dates,
            dataset: timeline.create_timeline(weekly_tasks, users)
        }
        //Task items
        this.setState({ 
            timeline: dataset, 
            task_sheets: task_sheet_data,
             documents: test_document_data,
             users: users
            })
    }



    //Timeline
    onFollowDate = () => {
        const date = new Date(this.state.timeline.weekly_labels[6])
        const weekly_dates = []
        weekly_dates.push(date.toLocaleDateString())
        for(let i = 0; i < 6; i++) {
            date.setDate(date.getDate() + 1)
            weekly_dates.push(date.toLocaleDateString())
        }

        const timeline = new Timeline([], null)
        const weekly_tasks = timeline.parse(this.state.task_sheets, weekly_dates[0], weekly_dates[6])

        const timeline_dataset = {
            weekly_labels: weekly_dates,
            dataset: timeline.create_timeline(weekly_tasks, this.state.users)
        }

        this.setState({ timeline: timeline_dataset })
    }
    onBackDate = () => {
        const date = new Date(this.state.timeline.weekly_labels[0])
        const weekly_dates = []
        weekly_dates.push(date.toLocaleDateString())
        for(let i = 0; i < 6; i++) {
            date.setDate(date.getDate() - 1)
            weekly_dates.push(date.toLocaleDateString())
        }
        console.log(weekly_dates)
        const timeline = new Timeline([], null)
        const weekly_tasks = timeline.parse(this.state.task_sheets, weekly_dates[6], weekly_dates[0])

        const timeline_dataset = {
            weekly_labels: weekly_dates.reverse(),
            dataset: timeline.create_timeline(weekly_tasks, this.state.users)
        }

        this.setState({ timeline: timeline_dataset })
    }
    //Task  
    //Task sheet methods
    createSheet = () => {
        const sheet = new Sheet(this.state.task_sheets, null)
        this.setState({task_sheets: sheet.create()})
    }

    switchReadOnly = (sheet_id) => {
        const sheet = new Sheet(this.state.task_sheets, sheet_id)
        sheet.sheet.readonly = !sheet.sheet.readonly
        this.setState({task_sheets: sheet.sheets})

        document.getElementById(`input-${sheet_id}`).focus()
    }

    changeSheetName = (sheet_id, value) => {
        const sheet = new Sheet(this.state.task_sheets, sheet_id)
        sheet.sheet.name = value;
        this.setState({task_sheets: sheet.sheets})
    }

    deleteSheet = (sheet_id) => {
        const confirm = window.confirm("Are you sure you want to delete this sheet?")
        if(confirm){
            const sheet = new Sheet(this.state.task_sheets, sheet_id);
            this.setState({task_sheets: sheet.delete()})
        }
        
    }

    //Task - task item methods
    changeTaskName = (task_id, name) => {
        const sheet = new Sheet(this.state.task_sheets, this.state.focus_sheet.id);
        const task = new Task(sheet.sheet.tasks, task_id)
        task.task.name = name;
        sheet.sheet.tasks = task.tasks;
        this.setState({
            task_sheets: sheet.sheets,
            focus_sheet: sheet.sheet, 
            focus_task: task.task})
    }

    dragStart = (sheet_id, task_id) => {
        const sheet = new Sheet(this.state.task_sheets, sheet_id)
        const task = new Task(sheet.sheet.tasks, task_id)
        this.grabbing_task = task.task
        this.from_sheet = sheet.sheet

    }

    dragEnd = () => {
        const sheet = new Sheet(this.state.task_sheets, this.hovering_sheet)
        this.setState({task_sheets: sheet.move(this.from_sheet, this.grabbing_task)})

        this.hovering_sheet = ""
        this.from_sheet = {}
        this.grabbing_task = {}
    }

    sheetHover = (sheet_id) => {
        this.hovering_sheet = sheet_id
    }

    createTask = (sheet_id) => {
        const sheet = new Sheet(this.state.task_sheets, sheet_id)
        const task = new Task(sheet.sheet.tasks, null)
        this.setState({task_sheets: sheet.add_task(task.craete())})
    }

    //Task - todo item methods
    createTodo = () => {
        const sheet = new Sheet(this.state.task_sheets, this.state.focus_sheet.id)
        const task = new Task(sheet.sheet.tasks, this.state.focus_task.id);
        const item = new Todo(task.task.todo, null);
        task.task.todo = item.create();
        sheet.sheet.tasks = task.tasks;
        this.setState({task_sheets: sheet.sheets})
    }
    
    deleteTodo = (todo_id) => {
        const confirm = window.confirm("Are you sure you want to delete this item?")
        if(confirm) {
            const sheet = new Sheet(this.state.task_sheets, this.state.focus_sheet.id);
            const task = new Task(sheet.sheet.tasks, this.state.focus_task.id);
            const item = new Todo(task.task.todo, todo_id)
            task.task.todo = item.delete()
            sheet.sheet.tasks = task.tasks
            this.setState({task_sheets: sheet.sheets})
        }
    }



    setTodo = (sheet_id, task_id) => {
        const sheet = new Sheet(this.state.task_sheets, sheet_id)
        const task = new Task(sheet.sheet.tasks, task_id)
        this.setState({
            focus_task: task.task,  
            focus_sheet: sheet.sheet
        })
    }

    checkTodoItem = (task_id, todo_id) => {
        const sheet = new Sheet(this.state.task_sheets, this.state.focus_sheet.id);
        const task = new Task(sheet.sheet.tasks, task_id);
        const todo = new Todo(task.task.todo, todo_id);
        todo.item.is_checked = !todo.item.is_checked
        task.task.todo = todo.items
        sheet.sheet.tasks = task.tasks
        this.setState({
            task_sheets: sheet.sheets, focus_task: task.task,
        })
    }

    changeItemName = (task_id, item_id, name) => {
        const sheet = new Sheet(this.state.task_sheets, this.state.focus_sheet.id)
        const task = new Task(sheet.sheet.tasks, task_id);
        const items = new Todo(task.task.todo, item_id)
        items.item.name = name
        task.tasks = items.items
        sheet.sheet.taks = task.tasks
        this.setState({
            task_sheets: sheet.sheets,
            focus_sheet: sheet.sheet,
            focus_task: task.task
        })
    }




    render = () => {
        return (<>
        <div className="project-app">
            <ProjectMenu/>
            <Routes>
                <Route exact path="/*" element={<TimelineView 
                timeline={this.state.timeline}
                onFollowDate={() => {this.onFollowDate()}}
                onBackDate={() => {this.onBackDate()}}
                />}/>

                <Route exact path="task/*" element={<TaskView
                task_sheets={this.state.task_sheets}
                focus_task = {this.state.focus_task}

                dragStart={(sheet_id, task_id) => {this.dragStart(sheet_id, task_id);}}
                dragEnd={(sheet_id) => {this.dragEnd(sheet_id);}}
                sheetHover={(sheet_id) => {this.sheetHover(sheet_id);}}

                createTodo={() => {this.createTodo()}}
                createTask={(sheet_id) => {this.createTask(sheet_id)}}
                createSheet={() => {this.createSheet()}}

                deleteSheet={(sheet_id) => {this.deleteSheet(sheet_id)}}
                deleteTodo={(todo_id) => {this.deleteTodo(todo_id)}}

                changeSheetName={(sheet_id, name) => {this.changeSheetName(sheet_id, name)}}
                changeTaskName={(task_id, name) => {this.changeTaskName(task_id, name)}}
                changeItemName={(task_id, item_id, name) => {this.changeItemName(task_id, item_id, name)}}
                
                openTodo={(sheet_id, task_id) => {this.setTodo(sheet_id, task_id)}}
                switchReadOnly={(sheet_id) => {this.switchReadOnly(sheet_id)}}
                checkTodoItem={(task_id, todo_id) => {this.checkTodoItem(task_id, todo_id)}}
                />}/>
                <Route exact path={"document/*"} element={<DocumentView
                documents={this.state.documents}
                />}/>
                <Route exact path={"document/edit/"} element={<DocumentEditorView/> }/>
            </Routes>
        </div>
        </>)
    }
}