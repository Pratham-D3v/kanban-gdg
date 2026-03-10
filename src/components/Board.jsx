import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import '../styles/Board.css';

const DEFAULT_COLUMNS = [
  { title: 'Todo', className: 'todo' },
  { title: 'In Progress', className: 'inprogress' },
  { title: 'Done', className: 'done' },
];

function Board({ tasks, setTasks }) {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('kanban-columns');
    return saved ? JSON.parse(saved) : DEFAULT_COLUMNS;
  });

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    setTasks(prev =>
      prev.map(task =>
        task.id === parseInt(draggableId)
          ? { ...task, column: destination.droppableId }
          : task
      )
    );
  }

  function handleAddColumn() {
    if (newColumnTitle.trim() === '') return;
    const newColumn = {
      title: newColumnTitle.trim(),
      className: 'custom',
    };
    const updated = [...columns, newColumn];
    setColumns(updated);
    localStorage.setItem('kanban-columns', JSON.stringify(updated));
    setNewColumnTitle('');
    setIsAddingColumn(false);
  }

  function handleDeleteColumn(columnTitle) {
    const updated = columns.filter(col => col.title !== columnTitle);
    setColumns(updated);
    localStorage.setItem('kanban-columns', JSON.stringify(updated));
    setTasks(prev => prev.filter(task => task.column !== columnTitle));
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map(col => (
          <Column
            key={col.title}
            title={col.title}
            className={col.className}
            tasks={tasks.filter(task => task.column === col.title)}
            setTasks={setTasks}
            isDefault={DEFAULT_COLUMNS.some(d => d.title === col.title)}
            onDeleteColumn={handleDeleteColumn}
          />
        ))}
        <div className="add-column-area">
          {isAddingColumn ? (
            <div className="add-column-form">
              <input
                className="add-column-input"
                placeholder="Column name"
                value={newColumnTitle}
                onChange={e => setNewColumnTitle(e.target.value)}
                autoFocus
              />
              <div className="add-column-buttons">
                <button className="btn-cancel-small" onClick={() => setIsAddingColumn(false)}>Cancel</button>
                <button className="btn-save-small" onClick={handleAddColumn}>Add</button>
              </div>
            </div>
          ) : (
            <button className="add-column-btn" onClick={() => setIsAddingColumn(true)}>
              + Add Column
            </button>
          )}
        </div>
      </div>
    </DragDropContext>
  );
}

export default Board;