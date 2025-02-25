import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editId, setEditId] = useState(null);

  // Load from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (!todoText.trim()) return;

    if (editId) {
      // Update the edited todo
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo.id === editId ? { ...todo, text: todoText } : todo
        );

        // Find the edited todo and move it to the front of the list
        const editedTodo = updatedTodos.find(todo => todo.id === editId);
        const filteredTodos = updatedTodos.filter(todo => todo.id !== editId);

        // Return the edited todo first, followed by the rest
        return [editedTodo, ...filteredTodos];
      });

      setEditId(null);
    } else {
      // Add new todo at the top
      setTodos((prevTodos) => [
        { id: Date.now(), text: todoText, completed: false },
        ...prevTodos,
      ]);
    }

    setTodoText("");
  };

  const toggleCompletion = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      // Move completed todos to the end of the list
      const completedTodos = updatedTodos.filter(todo => todo.completed);
      const incompleteTodos = updatedTodos.filter(todo => !todo.completed);

      return [...incompleteTodos, ...completedTodos]; // Incomplete todos first, completed last
    });
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTodoText(todoToEdit.text);
    setEditId(id);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleAddTodo}>{editId ? "Update" : "Add"}</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <span onClick={() => toggleCompletion(todo.id)}>{todo.text}</span>
            <div className="actions">
              <button onClick={() => editTodo(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button className="clear-btn" onClick={() => setTodos([])}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default App;
