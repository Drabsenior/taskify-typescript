import React from 'react'
import './style.css'

interface Props{
  todo:string;
  setTodo:React.Dispatch<React.SetStateAction<string>>;
  handleAdd:()=>void
}
const InputField:React.FC<Props> = ({todo,setTodo}) => {
    console.log(todo)
  return (
    <form className='input'>
        <input type="text" placeholder='Enter a task' 
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        className='input__box'/>
        <button className='input__submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField