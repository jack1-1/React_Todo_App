import React from "react";
import { useEffect, useState } from "react";
export default function App() {
  
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
   console.log(savedTodos)
   //console.log(todos)
    
    if (savedTodos) {
      return JSON.parse(savedTodos);
      } 
      else {
      return [];
    }
  });
  

  const [todo, setTodo] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
 
  const [currentTodo, setCurrentTodo] = useState({});

  
  //////-----//////

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  console.log(todos)


  /////-----//////


  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  
  //////---///////
  
  function handleEditInputChange(e) {
    
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }


  /////--------//////

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }


  //////// 1  ////////

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }



  //////// 2  ////////

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  //////// 3  ////////

  function handleUpdateTodo(id, updatedTodo) {
    
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    
    setIsEditing(false);
   
    setTodos(updatedItem);
  }

  //////// 4  ////////

  function handleEditClick(todo) {
    
    setIsEditing(true);
    
    setCurrentTodo({ ...todo });
  }

  
 ///////---JSX---//////// 
  return (
    <div className="App"  style={{border:"2px black solid" ,width:"50%", marginLeft:"20%",backgroundColor:"yellow"}} >
       
      
      {isEditing ? (
       
        <form onSubmit={handleEditFormSubmit}>
         
          <h2>Edit Todo</h2>
          
          <label htmlFor="editTodo">Edit todo: </label>
          
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
         
          <button type="submit">Update</button>
         
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) :  
      
      //////////////////else part///////////////////////
      
      (
        
        <form onSubmit={handleFormSubmit}>
         
          <h2 style={{color:'red',marginLeft:"40%",  marginTop:"5px"}}> To-Do List</h2>
          
          <label htmlFor="todo"><h5>Add todo:</h5> </label>
        
          <input
          style={{backgroundColor:"white", marginRight:"3px"}}
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />
         
          <button type="submit">Add</button>

          <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <br/>
           
            <button  style={{marginRight:"3px"}} onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
        </form>
        
      )}

    
    </div>
  );
}

