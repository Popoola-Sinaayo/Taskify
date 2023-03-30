import React, { useState, useReducer } from 'react';
import './App.css';
import {Todo} from "./modal"
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { TodoReducer } from './reducer';
import { DragDropContext, DropResult } from "react-beautiful-dnd";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, dispatch] = useReducer(TodoReducer, [])
  const [completedTodos, dispatchCompletedTodo] = useReducer(TodoReducer, [])
  console.log(todos)
  console.log(completedTodos)
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      dispatch({type: 'add', payload: todo})
      setTodo("")
    }
    console.log([...todos, { id: Math.random(), todo, isDone: false }])
  }
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result 
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    let add;
    let active = todos
    let complete = completedTodos

    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1) 
    }
    else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }
    if (destination.droppableId === 'TodosList') {
      // add = active[source.index]
      active.splice(destination.index, 0, add) 
    }
    else {
      console.log("Done")
      complete.splice(destination.index, 0, add)
    }
    dispatch({ type: "modify", payload: active })
    dispatchCompletedTodo({ type: "modify", payload: complete })
    
    if (destination.droppableId === 'TodosList') {
      dispatch({type: "done", payload: add.id})
      
    } else {
      dispatchCompletedTodo({ type: "done", payload: add.id })

    }
    
  }
  return (
    <DragDropContext onDragEnd={result => onDragEnd(result)}>
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={ todos} dispatch={dispatch} completedTodos={completedTodos} dispatchCompletedTodos={dispatchCompletedTodo} />
      </div>
    </DragDropContext>
      
  );
}

export default App;
