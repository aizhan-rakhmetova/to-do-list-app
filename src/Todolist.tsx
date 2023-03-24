import React, {ChangeEvent, useState} from "react";
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
    changeTaskStatus: (taskId: string, isDone: boolean)=> void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState(" ")
    const [error, setError] = useState<string | null>(null)


    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
    }
    const addTask = () => {
        if(newTaskTitle.trim() !== "" && newTaskTitle !== "bad word"){
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle(' ');
        } else{
            setError("Filed is required");
        }

    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");
    const onKeyDownPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        event.key === "Enter" && addTask();
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}
                        disabled ={newTaskTitle.length === 0}>
                    +
                </button>
                {newTaskTitle.length>15 && <div style ={{color: "red"}}>TEXT IS TOO LONG</div>}
                {error && <div className="error-message"> {error}</div> }
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked);
                        }
                        return (
                            <li key={task.id} className = {task.isDone ? "is-done" : ''}>
                                <input type="checkbox" onChange = {onChangeHandler}/>
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
                <button className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
                {/*<input placeholder="date of birth"/>*/}
            </div>
        </div>
    )
}
