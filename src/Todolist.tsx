import React, {useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: Array<TasksType>;
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTaskTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState(" ")

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle(' ');
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onKeyDownPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addTask();


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownPressHandler}/>
                <button onClick={addTask}
                        disabled ={newTaskTitle.length === 0}>
                    +
                </button>
                {newTaskTitle.length>15 && <div style ={{color: "red"}}>TEXT IS TOO LONG</div>}
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id);
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button
                                    onClick={onRemoveTaskHandler}>
                                    x
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
                {/*<input placeholder="date of birth"/>*/}
            </div>
        </div>
    )
}
