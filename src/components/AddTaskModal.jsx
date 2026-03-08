import { useState } from 'react';
import '../styles/Modal.css';

function AddTaskModal({ columnTitle, onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit() {
    if (title.trim() === '') return;
    onAdd(title, description);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Add Task to {columnTitle}</h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-add" onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;
