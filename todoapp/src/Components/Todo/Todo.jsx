import './Todo.css';
import { useState } from 'react';
const Todo = () => {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if (input.trim()) {
            const newTask = {
                id: Date.now(),
                text: input,
                completed: false
            }
            setTasks([...tasks, newTask])
            setInput('');

        }
    }

    const deleteTask = (id) => {
        const update = tasks.filter((task) => task.id !== id);
        setTasks(update);
    }

    const completeTask = (id) => {
        const update = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
        setTasks(update);
    }

    return (
        <div className="todo">
            <h2 className="heading">TO DO LIST</h2>
            <div className="input-box">
                <input type="text" placeholder="Enter a task"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
                <button onClick={addTask}>Add Todo</button>
            </div>
            <div className="todo-list">
                <ul>
                    {tasks.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#fff", fontStyle: "italic" }}>No tasks available. Add new task!</p>
                    ):
                        tasks.map((task) => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox"
                                        checked={task.completed}
                                        onChange={() => completeTask(task.id)}
                                    />
                                    <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</span>
                                    <span className="delete" onClick={() => deleteTask(task.id)}>Delete</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo
