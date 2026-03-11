import { useState } from "react"

function ToDoList() {
    const [task, setTask] = useState([]);
    const [newtask, setNewTask] = useState("");

    function handleChange(e) {
        setNewTask(e.target.value);
    }

    function handleAddTask() {
        setTask(t => [...t, newtask])

        setNewTask("")
    }

    function handleRemoveTask(index) {
        setTask(task.filter((_, i) => i !== index))
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]
            setTask(updatedTasks)
        }
    }

    function moveTaskDown(index) {
        if (index < task.length - 1) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]
            setTask(updatedTasks)
        }
    }

    return (
        <>
            <div className="to-do-list-container">
                <h1>To-Do-List:</h1>
                <input type="text" onChange={(e) => handleChange(e)} value={newtask} placeholder="Enter a task..." />
                <button className="add-btn" onClick={(e) => handleAddTask(e)}>Add <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="#000000" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14" />
                    <path d="M12 5v14" /></svg>
                </button>
                <ul>
                    {task.map((t, index) =>
                        <li key={index}>
                            {t}
                            <button className="remove-btn" onClick={() => handleRemoveTask(index)}>Remove</button>
                            <button className="move-up-btn" onClick={() => moveTaskUp(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-up-icon lucide-move-up">
                                    <path d="M8 6L12 2L16 6" /><path d="M12 2V22" />
                                </svg>
                            </button>
                            <button className="move-up-btn" onClick={() => moveTaskDown(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-down-icon lucide-move-down">
                                    <path d="M8 18L12 22L16 18" /><path d="M12 2V22" />
                                </svg>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default ToDoList
