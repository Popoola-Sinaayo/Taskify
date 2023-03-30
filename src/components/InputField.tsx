import React, {useRef} from 'react'
import "./styles.css"

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent) => void
}
function InputField({ todo, setTodo, handleAdd }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.focus()
    }}>
          <input type="text" ref={inputRef} placeholder='Enter Text' value={todo} onChange={e => setTodo(e.target.value)} className='input__box' />
          <button className='input__submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField