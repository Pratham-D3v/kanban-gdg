import { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Card from './Card';
import AddTaskModal from './AddTaskModal';
import '../styles/Column.css';

function Column({ title, className, tasks, setTasks }) {
  const [showModal, setShowModal] = useState(false);

  function handleAddTask(taskTitle, taskDescription) {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      column: title,
    };
    setTasks(prev => [...prev, newTask]);
  }

  return (
    <div className={`column ${className}`}>
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            className={`column-body ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      task={task}
                      setTasks={setTasks}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="add-task-btn" onClick={() => setShowModal(true)}>
        + 
      </button>
      {showModal && (
        <AddTaskModal
          columnTitle={title}
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Column;