import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: false },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Redux", isDone: true }
    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( task => task.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter (value: FilterValuesType ){
        setFilter(value);
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
        <div className="App">
            <Todolist title = "What to learn"
                      tasks = {tasksForToDoList}
                      removeTask = {removeTask}
                      changeFilter = {changeFilter}
            />
        </div>
    );
}

export default App;
