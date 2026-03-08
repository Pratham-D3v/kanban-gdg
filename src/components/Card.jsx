import { useState } from 'react';
import '../styles/Card.css';

function Card({ task, setTasks, isDragging }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  function handleDelete() {
  const cardElement = document.getElementById(`card-${task.id}`);
  if (cardElement) {
    cardElement.classList.add('card-exit');
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== task.id));
    }, 280);
  }
}

  function handleMove(newColumn) {
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, column: newColumn } : t
      )
    );
  }

  function handleSave() {
    if (editTitle.trim() === '') return;
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id
          ? { ...t, title: editTitle, description: editDescription }
          : t
      )
    );
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className={`card ${isDragging ? 'dragging' : ''}`}>
        <input
          className="card-edit-input"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
        <textarea
          className="card-edit-textarea"
          value={editDescription}
          onChange={e => setEditDescription(e.target.value)}
        />
        <div className="card-edit-buttons">
          <button className="btn-cancel-small" onClick={() => setIsEditing(false)}>Cancel</button>
          <button className="btn-save-small" onClick={handleSave}>Save</button>
        </div>
      </div>
    );
  }

  return (
    <div
  id={`card-${task.id}`}
  className={`card card-enter ${isDragging ? 'dragging' : ''}`}
>
      <div className="card-top">
        <p className="card-title">{task.title}</p>
        <div className="card-actions">
          <button className="card-edit" onClick={() => setIsEditing(true)}>✎</button>
          <button className="card-delete" onClick={handleDelete}>✕</button>
        </div>
      </div>
      {task.description && (
        <p className="card-description">{task.description}</p>
      )}
      <select
        className="card-move"
        value={task.column}
        onChange={e => handleMove(e.target.value)}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
}

export default Card;