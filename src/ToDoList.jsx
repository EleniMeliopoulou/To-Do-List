import { useState } from "react"

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const typeColors = {
        "Important": "5px solid red",
        "Best-To-do": "5px solid orange",
        "Optional": "5px solid green",
    }

    function handleChange(e) {
        setNewTask(e.target.value);
    }

    function handleAddTask() {

        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, completed: false, type: "" }])
            setNewTask("")
        }
    }

    function handleRemoveTask(index) {
        setTasks(tasks.filter((_, i) => i !== index))
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
            setTasks(updatedTasks)
        }
    }

    function completedTask(index) {
        setTasks(prev =>
            prev.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function handleTaskType(index, value) {
        setTasks(prev =>
            prev.map((task, i) =>
                i === index ? { ...task, type: value } : task
            )
        );
    }

    return (
        <>
            <div className="to-do-list-container">
                <h1>To-Do-List:</h1>
                <div>
                    <input type="text" onKeyDown={(e) => {
                        if (e.key === "Enter") { handleAddTask()} }} onChange={(e) => handleChange(e)} value={newTask} placeholder="Enter a task..." />
                    <button className="add-btn" onClick={(e) => handleAddTask(e)}>Add </button>
                </div>
                <ol>
                    {tasks.map((task, index) =>
                        <li key={index} onDoubleClick={() => completedTask(index)} style={{
                            backgroundColor: task.completed ? "transparent" : "rgba(232, 232, 232, 0.903)",
                            borderLeft: typeColors[task.type]
                        }}
                        >
                            <span className="text" style={{
                            textDecoration: task.completed ? "line-through" : "none"}}>{task.text}</span>
                            <button className="remove-btn" onClick={() => handleRemoveTask(index)}>Remove</button>
                            <button className="move-up-btn" onClick={() => moveTaskUp(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-icon lucide-arrow-up">
                                    <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
                                </svg>
                            </button>
                            <button className="move-down-btn" onClick={() => moveTaskDown(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-icon lucide-arrow-down">
                                    <path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>
                            </button>
                            <select value={task.type} onChange={(e) => handleTaskType(index, e.target.value)}>
                                <option value="">Select an option</option>
                                <option value="Important" style={{ backgroundColor: "hsla(0, 100%, 50%, 0.5)" }}>Important 🔴</option>
                                <option value="Best-To-do" style={{ backgroundColor: "hsla(39, 100%, 50%, 0.5)" }}>Better To Do 🟠</option>
                                <option value="Optional" style={{ backgroundColor: "hsla(120, 100%, 25%, 0.5)" }}>Optional 🟢</option>
                            </select>
                        </li>
                    )}
                </ol>
            </div>
        </>
    )
}

export default ToDoList
