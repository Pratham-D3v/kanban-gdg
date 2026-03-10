import { Droppable, Draggable } from '@hello-pangea/dnd';
import Card from './Card';
import '../styles/Column.css';

function Column({ title, className, tasks, setTasks, isDefault, onDeleteColumn }) {
  return (
    <div className={`column ${className}`}>
      <div className="column-header">
        <h2>{title}</h2>
        <div className="column-header-right">
          <span className="task-count">{tasks.length}</span>
          {!isDefault && (
            <button
              className="column-delete"
              onClick={() => onDeleteColumn(title)}
            >
              ✕
            </button>
          )}
        </div>
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
                      columnClassName={className}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;