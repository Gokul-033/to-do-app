import React, { useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [editId, setEditId] = useState(null);

    const handleAddTodo = () => {
        if (todoText.trim()) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false,
            };
            setTodos([...todos, newTodo]);
            setTodoText('');
        }
    };

    const handleUpdateTodo = () => {
        if (editId !== null) {
            const updatedTodos = todos.map((todo) =>
                todo.id === editId ? { ...todo, text: todoText } : todo
            );
            setTodos(updatedTodos);
            setEditId(null);
            setTodoText('');
        }
    };

    const toggleCompletion = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const editTodo = (index) => {
        setEditId(todos[index].id);
        setTodoText(todos[index].text);
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="todo-container">
            <h1>To-Do App</h1>
            <input
                type="text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                placeholder="Enter your todo"
            />
            <button onClick={editId ? handleUpdateTodo : handleAddTodo}>
                {editId ? 'Update Todo' : 'Add Todo'}
            </button>

            <ul>
                {todos.map((todo, index) => (
                    <li key={todo.id}>
                        <div className="todo-text">
                            <span
                                onClick={() => toggleCompletion(index)}
                                className={todo.completed ? "completed" : ""}
                            >
                                {todo.text}
                            </span>
                        </div>
                        <div className="todo-actions">
                            <button className="edit-btn" onClick={() => editTodo(index)}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteTodo(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
