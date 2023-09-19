import { make_uuid } from "./common";

export class Sheet {
    constructor(sheets, id){
        this.sheets = sheets;
        this.id = id;
        for (var i = 0; i < sheets.length; i++){
            if(sheets[i].id == id){
                this.sheet = sheets[i];
            }
        }
    }

    
    create = () => {
        const sheet = {
            id: make_uuid(),
            name: "Empty sheet",
            tasks: [
                {id: make_uuid(), name: "Empty task", todo: []},
            ]
        }
        this.sheets.push(sheet);
        return this.sheets;
    }
    
    delete = () => {
        for(let i = 0; i < this.sheets.length; i++){
            if(this.sheets[i].id == this.id){
                this.sheets.splice(i, 1);
            }
        }
        return this.sheets
    }

    move = (from_sheet, item) => {
        this.sheet.tasks.push(item);

        for (let i = 0; i < this.sheets.length; i++){
            if(this.sheets[i].id === this.id){
                this.sheets[i] = this.sheet
            }
        }


        for (var i = 0; i < this.sheets.length; i++){
            if(this.sheets[i].id == from_sheet.id){
                const sheet = this.sheets[i];
                for (let i = 0; i < sheet.tasks.length; i++){
                    if(sheet.tasks[i].id == item.id){
                        sheet.tasks.splice(i, 1);
                    }
                }
                this.sheets[i] = sheet
            }
        }
        return this.sheets
    }

    add_task = (task) => {
        this.sheet.tasks.push(task)
        for (let i = 0; i < this.sheets.length; i++){
            if(this.sheets[i].id == this.id){
                this.sheets[i] = this.sheet
            }
        }
        return this.sheets
    }

}




export class Task {
    constructor(tasks, id){
        this.tasks = tasks;
        this.id = id;
        for (var i = 0; i < tasks.length; i++){
            if(tasks[i].id == id){
                this.task = tasks[i];
            }
        }
    }

    craete = () => {
        const task = {
            id: make_uuid(),
            name: "Empty task",
            todo: []
        }
        return task;
    }
    
    delete = () => {
        
    }

}


export class Todo{
    constructor(items, id){
        this.id = id;
        this.items = items;

        for (let i = 0; i < items.length; i++){
            if(items[i].id == id){
                this.item = items[i]
            }
        }
    }

    create = () => {
        const item = {
            id: make_uuid(),
            name: "Empty Todo",
            is_checked: false
        }
        this.items.push(item);

        return this.items
    }

    delete = () => {
        for (let i = 0; i < this.items.length; i++) {
            if(this.items[i].id == this.id){
                 this.items.splice(i, 1)
            }
        }
        return this.items;
    }

}