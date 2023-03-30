import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../modal'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./styles.css"
import { Actions } from '../reducer'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    dispatch: React.Dispatch<Actions>;
  dispatchCompletedTodos: React.Dispatch<Actions>

}

const SingleTodo = ({index, todo, todos, dispatch, dispatchCompletedTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editedText, setEditedText] = useState<string>(todo.todo)
    const handleDone = (id: number, isDone: boolean) => {
        console.log(id)
        if (!isDone) {
            dispatch({ type: "done", payload: id })
            dispatch({ type: "remove", payload: id })
            dispatchCompletedTodos({ type: "addNew", payload: todo.todo})
        }
        else {
            dispatchCompletedTodos({ type: "done", payload: id })
            dispatchCompletedTodos({type: "remove", payload: id})
            dispatch({ type: "addNewNot", payload: todo.todo})
        }
        // setTodos(todos.map(item => item.id === id ? { ...item, isDone: !todo.isDone } : item ))
    }
    const handleDelete = (id: number) => {
        dispatch({type: "remove", payload: id})
        // setTodos(todos.filter(item => item.id !== id))
    }

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault()
        dispatch({type: "edit", payload: {id: id, todo: editedText}})
        // setTodos(todos.map(item => item.id === id ? { ...item, todo: editedText } : item))
        setEdit(false)
    }
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])
    return (
      <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {edit ? (
                <input ref={inputRef} type="text" id="" value={editedText} onChange={e => setEditedText(e.target.value)} className='todos__single--text' />
          ): (
             todo.isDone ? <s className="todos__single--text">
              {todo.todo}
          </s>
              :
              <span className="todos__single--text">
              {todo.todo}
          </span>     
          )
          }
          
          <div>
              <span className="icon" onClick={() => {
                  if(!edit && !todo.isDone) {
                      setEdit(!edit)
                  }
                }
                }>
                  <AiFillEdit />
              </span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                  <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id, todo.isDone)}>
                  <MdDone />
              </span>
          </div>
            </form>
                )
            }
      
      </Draggable>
            
  )
}

export default SingleTodo