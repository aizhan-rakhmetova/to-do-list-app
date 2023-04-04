import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import {Button, Checkbox} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} />
            <ul style={{listStyleType: 'none'}}>
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
                                <Checkbox onChange = {onChangeStatusHandler} checked={task.isDone}/>

                                <EditableSpan title ={task.title} onChange = {onChangeTaskTitleHandler}/>
                                <IconButton aria-label="delete" size="small" onClick={onRemoveTaskHandler}>
                                    <Delete fontSize="inherit" />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
                {/*<input placeholder="date of birth"/>*/}
            </div>
        </div>
    )
}

