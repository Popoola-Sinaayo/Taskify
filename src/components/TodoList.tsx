import React from 'react'
import { Todo } from '../modal'
import SingleTodo from './SingleTodo'
import { Actions } from '../reducer'
import {Droppable} from "react-beautiful-dnd"

interface Props {
  todos: Todo[],
  dispatch: React.Dispatch<Actions>,
  completedTodos: Todo[],
  dispatchCompletedTodos: React.Dispatch<Actions>
}

function TodoList({todos, dispatch, completedTodos, dispatchCompletedTodos}: Props) {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          (provided) => (
             <div className="todos" ref={provided.innerRef} {...provided.droppableProps}> 
        <span className="todos__heading">
          Active Tasks
        </span>
      {todos?.map((todo, index) => {
        return (
          <SingleTodo todo={todo} key={todo.id} todos={todos} dispatch={dispatch} dispatchCompletedTodos={dispatchCompletedTodos} index={index} />
        )
      })}  
              {provided.placeholder}
        </div>
          )
        }
       </Droppable>
      <Droppable droppableId="CompletedList">
        {(provided) => (<div className='todos remove' ref={provided.innerRef} {...provided.droppableProps}>
<span className="todos__heading">
          Completed Tasks
        </span>
      {completedTodos?.map((todo, index) => {
        return (
          <SingleTodo todo={todo} key={todo.id} todos={todos} dispatch={dispatch} dispatchCompletedTodos={dispatchCompletedTodos} index={index} />
        )
      })}
              {provided.placeholder}
          
      </div>)}
        </Droppable>
      
      </div>
  )
  
}

export default TodoList