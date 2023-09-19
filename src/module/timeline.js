export class Timeline {
    constructor(datasets=[], id){
        this.datasets = datasets;
        this.id = id;
        for (let i = 0; i < datasets.length; i++) {
            if(datasets[i].id && datasets[i].id === id ) {
                this.target  = datasets[i];
            } 
        }
    }

    

    is_exists = (array, key, value) => {
        for (let i = 0; i < array.length; i++) {
            if(array[i][key] === value){
                return true
            }
        }
        return false
    }

    create_blank = (index) => {
        const blank_array = [];
        for (let i = 0; i < index ; i++) {
            blank_array.push({})
        }
        return blank_array;
    }




    parse = (sheet, start_at, end_at) => {
        console.log(start_at, end_at);

        const tasks = [];
        const weekly_array = [];
        const week_start = new Date(start_at)        
        const week_end = new Date(end_at)
        // すべてのシートからタスクを抽出
        for (let i = 0; i < sheet.length; i++){
            for(let j = 0; j < sheet[j].tasks.length; j++){
                tasks.push(sheet[i].tasks[j])
            }
        }


        //それぞれのタスクの長さを確認
        for (let i = 0; i < tasks.length; i++){
            const week_tasks = []
            const transformed_tasks = []

            const task_start = new Date(tasks[i].start_at)
            const task_end = new Date(tasks[i].end_at)
            const length_date = new Date(task_end - task_start)
            const task_length = length_date.getDate()

            const to_task_start = task_start.getDate() - week_start.getDate()
            const to_task_end = week_end.getDate() - task_end.getDate()


            //タスクの整理
            for(let j = 0; j < 7; j++){
                const target_date= new Date().setDate(week_start.getDate() + i)
                if(task_start < target_date && !this.is_exists(week_tasks, "id", tasks[i].id)){
                    week_tasks.push({
                        user_id: tasks[i].user_id,
                        id: tasks[i].id,
                        name: tasks[i].name,
                        start_at: task_start,
                        end_at: task_end,
                        length: task_length,
                        to_task_start: to_task_start,
                        to_task_end: to_task_end
                    })
                }
                else if (target_date < task_end && !this.is_exists(week_tasks, "id", tasks[i].id)){
                    week_tasks.push({
                        user_id: tasks[i].user_id,
                        id: tasks[i].id,
                        name: tasks[i].name,
                        start_at: task_start,
                        end_at: task_end,
                        length: task_length,
                        to_task_start: to_task_start,
                        to_task_end: to_task_end
                    })
                }
                else {
                    week_tasks.push({})
                } 
            }

            //タスクの長さと開始日からバーに変換する
            for (let i = 0; i < week_tasks.length; i ++){
                if(week_start < week_tasks[i].start_at && week_tasks[i].end_at < week_end) {
                    const based_array = transformed_tasks.concat(this.create_blank(week_tasks[i].to_task_start));
                    based_array.push({
                        id: week_tasks[i].id,
                        name: week_tasks[i].name,
                        user_id: week_tasks[i].user_id,
                        length : week_tasks[i].length,
                    });
                    weekly_array.push(based_array.concat(this.create_blank(week_tasks[i].to_task_end)));
                    break;
                } else if(week_start < week_tasks[i].start_at && !(week_tasks[i].start_at > week_end)){
                    const based_array = transformed_tasks.concat(this.create_blank(week_tasks[i].to_task_start));
                    based_array.push({
                        id: week_tasks[i].id,
                        name: week_tasks[i].name,
                        user_id: week_tasks[i].user_id,
                        length : 7 - week_tasks[i].to_task_start,
                    });
                    weekly_array.push(based_array)
                    break;
                } else if (week_tasks[i].end_at < week_end && !(week_tasks[i].end_at < week_start)){
                    transformed_tasks.push({
                        id: week_tasks[i].id,
                        name: week_tasks[i].name,
                        user_id: week_tasks[i].user_id,
                        length : week_tasks[i].to_task_end - 7,
                    });
                    weekly_array.push(transformed_tasks.concat(this.create_blank(week_tasks[i].to_task_end)))
                    break;
                } else {
                    weekly_array.push(transformed_tasks.concat(this.create_blank(7)))
                    break
                }
            }  
        }
        return weekly_array;
    }



    omit_task = (task, user) => {
        const omitted_task = []
        for(let i = 0; i < task.length; i++) {
            omitted_task.push(task[i].user_id === user.id? task[i]: {})
        }
        return omitted_task;
    }

    increment_index = (task) => {
        let index = 0;
        for (let i = 0; i < task.length; i++) {
            if(!task[i].id) {index += 1}
        }
        return {
            task: task,
            index: index
        }
    }




    create_timeline = (parsed_tasks, users) => {
        const user_tasks = []

        for (let i = 0; i < users.length; i++) {
            const tasks = []
            for(let j = 0; j < parsed_tasks.length; j++) {
                const target = parsed_tasks[j]
                tasks.push(this.omit_task(target, users[i]))
            }

            for (let j = 0; j < tasks.length; j++) {
                const target = tasks[j]
                const incremented = this.increment_index(target)

                if(incremented.index == incremented.task.length){tasks.splice(j, 1)}
            }
            const user = {
                id: users[i].id,
                name: users[i].name,
                weekly_tasks: tasks
            }
            user_tasks.push(user)
        }
        return user_tasks
    }
}