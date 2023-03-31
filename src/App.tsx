import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let todolistTasks = tasksObj[todoListId]
        let filteredTasks = todolistTasks.filter(task => task.id !== id)
        tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const addTask = (newTaskTitle: string, todoListId: string) => {
        let newTask = { id: v1(), title: newTaskTitle, isDone: false}

        let todolistTasks = tasksObj[todoListId]
        tasksObj[todoListId] = [newTask, ...todolistTasks]

        setTasksObj({...tasksObj});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todolistTasks = tasksObj[todoListId]
        let task = todolistTasks.find((tl) => tl.id === taskId)

        if (task) {
            task.isDone = isDone;
        }
        setTasksObj({...tasksObj});
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl=>tl.id !== todolistId))

        //to delete часть из ассоциативного массива
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Chocolate", isDone: false}
        ]
    })


    return (
        <div className="todolist">
            {
                todolists.map((tl) => {
                    let tasksForToDoList = tasksObj[tl.id]
                    if (tl.filter === "completed") {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
                    }
                    if (tl.filter === "active") {
                        tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
                    }
                    return (
                        <Todolist
                            todolistId={tl.id}
                            key={tl.id}
                            title={tl.title}
                            tasks={tasksForToDoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
