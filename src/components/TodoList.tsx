import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Todo } from '../models'
import SingleTodo from './SingleTodo'
import './style.css'
interface Props {
    todos:Todo[]
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos:Todo[]
    setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>

}
const TodoList:React.FC<Props> = ({todos,setTodos,completedTodos,setCompletedTodos}:Props) => {
  return (
 <div className="container">     
    <Droppable droppableId='Acitvetask'>
    {
        (provided,snapshot)=>(

    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps} >
        <span className="todos__heading">Active tasks</span>
        {todos && (

            todos.map((todo,index)=>(
                
            <SingleTodo todo={todo} index={index} todos={todos} setTodos={setTodos} key={todo.id}/>
            
        ))
        )
    }          
                        {provided.placeholder}

        </div>
        )
    }
     </Droppable>

             <Droppable droppableId='Completedtask'>
          {
            (provided,snapshot)=>(

                <div className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`} ref={provided.innerRef} {...provided.droppableProps}>
                     <span className="todos__heading">Completed tasks</span>
                    {completedTodos.map((todo,index)=>(
                        <SingleTodo todo={todo} index={index} todos={completedTodos} setTodos={setCompletedTodos} key={todo.id}/>
                        ))}
                        {provided.placeholder}
          </div>
            )
          }
                </Droppable>
 </div>
    )
}

export default TodoList