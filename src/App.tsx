import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: false },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Redux", isDone: true }
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string) {
        let filteredTasks = tasks.filter( task => task.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter (value: FilterValuesType ){
        setFilter(value);
    }

    const addTask = (newTaskTitle: string)=>{
        let newTask = {
            id: v1(),
            title: newTaskTitle,
            isDone: false}
        setTasks([newTask, ...tasks]);
    }

    let tasksForToDoList = tasks;
    if(filter === "completed") {
        tasksForToDoList = tasks.filter(t=>t.isDone === true);
    }
    if(filter === "active") {
        tasksForToDoList = tasks.filter(t=>t.isDone === false);
    }

    // const tasks2 = [
    //     { id: 1, title: "Hello world", isDone: true },
    //     { id: 2, title: "I am Happy", isDone: false },
    // ]

    return (
        <div className = "todolist">
            <Todolist title = "What to learn"
                      tasks = {tasksForToDoList}
                      removeTask = {removeTask}
                      changeFilter = {changeFilter}
                      addTask ={addTask}
            />
        </div>
    );
}

export default App;
