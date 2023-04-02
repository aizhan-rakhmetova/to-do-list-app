import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
}

type PropsType = {
    id: string
    title: string;
    tasks: Array<TasksType>;
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string ) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string)=> void
    changeTaskTitle: (taskId: string, newValue:string, todolistId: string)=> void
    filter: FilterValuesType
    removeTodolist: (todolistId: string)=> void
    changeTodolistTitle: (todolistId: string, newValue: string)=> void


}

export function Todolist(props: PropsType) {
    const addTask = (todolistTitle: string) => {
            props.addTask(todolistTitle.trim(), props.id);

    }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = ()=> {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (newValue: string)=> {
        props.changeTodolistTitle(props.id, newValue );
    }



    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/> <button onClick={removeTodolist}>X</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id, props.id );
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                        }
                        const onChangeTaskTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id);
                        }
                        return (
                            <li key={task.id} className = {task.isDone ? "is-done" : ''}>
                                <input type="checkbox" onChange = {onChangeStatusHandler}/>

                                <EditableSpan title ={task.title} onChange = {onChangeTaskTitleHandler}/>

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

