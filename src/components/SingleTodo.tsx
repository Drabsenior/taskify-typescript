import React,{useState,useRef, useEffect} from 'react'
import { Todo } from '../models'
import {BiCheck} from 'react-icons/bi'
import {MdEdit,MdDelete} from 'react-icons/md'
import { setDefaultResultOrder } from 'dns'
import { Draggable } from 'react-beautiful-dnd'
interface Props{
    todo: Todo
    todos:Todo[]
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    index:number

}


const SingleTodo:React.FC<Props> = ({todo,todos,setTodos,index}) => {
    const [edit,setEdit] = useState<boolean>(false)
    const [editTodo,setEditTodo]=useState<string>(todo.todo)
    const handleDone = (id:number)=>{
       setTodos(todos.map((todo)=>todo.id === id ? {...todo,isDone:!todo.isDone}:todo))
    }

    const handleDelete = (id:number)=>{
       setTodos(todos.filter((todo)=>todo.id !==id))
    }

    const handleEdit = (e:React.FormEvent,id:number)=>{
        e.preventDefault()
        setTodos(todos.map((todo)=>todo.id ===id ? {...todo,todo:editTodo}:todo))
        setEdit(!edit)
    }
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
      inputRef.current?.focus()
    },[edit])
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

        {
            (provided)=>(

                
                <form  className="todos__single" onSubmit={(e)=>handleEdit(e,todo.id)} {...provided.draggableProps } {...provided.dragHandleProps} ref={provided.innerRef}>

      {
          edit ? (
              <input type="text" value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} className="todos__single--text" ref={inputRef}/>
              ):(
                  
                  todo.isDone ? (
                      <s className="todos__single--text">
            {todo.todo}
        </s>
            ): (
                <span className="todos__single--text">
            {todo.todo}
        </span>
            )
            
            )
        }

       
        
        <div >
        <span className="icon" onClick={()=>{
            if( !todo.isDone){
                setEdit(!edit)
            }
        }}>
            <MdEdit/>
        </span>
        <span className="icon" onClick={()=>handleDelete(todo.id)}>
            <MdDelete/>
        </span>
        <span className="icon" onClick={()=>handleDone(todo.id)}>
            <BiCheck/>
        </span>
        </div>
    </form>

)
}
            </Draggable>
  )
}

export default SingleTodo