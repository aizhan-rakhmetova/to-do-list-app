import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Grid, Paper} from "@mui/material";
import Container from '@mui/material/Container';
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed"
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TodolistStateType = {
    [key: string] : Array<TasksType>
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

    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
        let todolistTasks = tasksObj[todoListId]
        let task = todolistTasks.find((tl) => tl.id === taskId)

        if (task) {
            task.title = newValue;
        }
        setTasksObj({...tasksObj});
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl=>tl.id !== todolistId))

        //to delete часть из ассоциативного массива
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    const changeTodolistTitle = (todolistId: string, newValue: string ) => {
        let todolist = todolists.find(tl=>tl.id === todolistId)
        if(todolist){
            todolist.title=newValue
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasksObj] = useState<TodolistStateType>({
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

    function addTodolistItem (title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {
            id: newTodolistId,
            filter: "all",
            title: title
        }

        setTodolists([newTodolist, ...todolists ])
        setTasksObj({
            ...tasksObj,
            [newTodolistId]: []
        })

    }
    return (
        <div>
            <AppBar position="static" sx={{ height: 64 }} >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">Todolist</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed sx={{ marginLeft: 0 }}>
                <Grid  container style={{padding: "20px" }}  >
                    <AddItemForm addItem={addTodolistItem}  />
                </Grid>
                <Grid container spacing={3} style={ {padding: "20px" }}>
                    {
                        todolists.map((tl, index) => {
                            let tasksForToDoList = tasksObj[tl.id]
                            if (tl.filter === "completed") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === true);
                            }
                            if (tl.filter === "active") {
                                tasksForToDoList = tasksForToDoList.filter(t => t.isDone === false);
                            }
                            return (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Paper style={ {padding: "10px" }}>
                                        <Todolist
                                            id={tl.id}
                                            key={tl.id}
                                            title={tl.title}
                                            tasks={tasksForToDoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
