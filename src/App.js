import React, { useState } from 'react';
import './App.css';

const buttonStyle = {
  marginLeft: '15px',
  padding: '2px 8px',
  background: 'purple',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

function TaskList({ tasks, onDelete, onEdit, onToggleCompleted }) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '15px',
              background: task.completed ? '#e0e0e0' : '' // Добавлен фон для выделения завершённых задач
            }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompleted(index)}
          />
          {task.editing ? (
            <input
              type="text"
              value={task.text}
              onChange={(e) => onEdit(index, e.target.value, true)} // Изменено, чтобы состояние редактирования оставалось активным
            />
          ) : (
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          )}
          <div>
            {task.editing ? (
              <button onClick={() => onEdit(index, task.text, false)}>Сохранить</button> // Кнопка сохранения изменений
            ) : (
              <button onClick={() => onDelete(index)} style={buttonStyle}>
                Удалить
              </button>
            )}
            <button 
              onClick={() => onEdit(index, task.text, !task.editing)} 
              style={buttonStyle}
            >
              {task.editing ? 'Отмена' : 'Редактировать'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TaskForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({ text, completed: false, editing: false }); // Убедитесь, что каждая новая задача добавляется без режима редактирования
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новая задача"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" style={buttonStyle}>Добавить</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText, editing = false) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], text: newText, editing: editing };
    setTasks(updatedTasks);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
  };

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>Список задач (To-Do List)</h1>
      <TaskForm onAdd={addTask} />
      <TaskList 
        tasks={tasks} 
        onDelete={deleteTask} 
        onEdit={editTask} 
        onToggleCompleted={toggleCompleted} 
      />
    </div>
  );
}

export default App;