import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import {Todo} from './models'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
const App:React.FC = ()=>{
   
  const [todo, setTodo] = useState<string>("")
  const [todos,setTodos]= useState<Todo[]>([])
  const [completedTodos,setCompeletedTodos]=useState<Todo[]>([])
 


  const handleAdd = (e:React.FormEvent)=>{
      e.preventDefault()
      setTodos([...todos,{id:Date.now(),todo:todo,isDone:false}])
      setTodo('')
      console.log(todo)
  }
  const handleOnDrag = (result:DropResult)=>{
    console.log(result)
    const {source,destination} = result

    if(!destination) return
    if(source.droppableId===destination.droppableId && source.index === destination.index) return

    let add; 
    let active= todos; 
    let complete= completedTodos;
    console.log(result);
  
    if(source.droppableId ==='Acitvetask'){
      add= active[source.index]
      active.splice(source.index,1)
    }else {
      add = complete[source.index]
      complete.splice(source.index,1)
    }

    if(destination.droppableId =='Acitvetask'){
      active.splice(destination.index, 0, add)
      console.log('destination active');
      console.log(destination.droppableId)
    }else{
      complete.splice(destination.index, 0 , add)
      console.log('destination complete')
      console.log(destination.droppableId)

    }
    
   

    setCompeletedTodos(complete)
    setTodos(active)
    
    console.log(add);
    console.log(active);
    console.log(complete)
  }
  return (
    <DragDropContext onDragEnd={handleOnDrag}>

    <div className="App">
     <span className="heading">Taskify</span>
     <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
     <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompeletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
