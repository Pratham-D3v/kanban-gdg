import { DragDropContext } from '@hello-pangea/dnd';
import Column from './Column';
import '../styles/Board.css';

const COLUMNS = [
  { title: 'Todo', className: 'todo' },
  { title: 'In Progress', className: 'inprogress' },
  { title: 'Done', className: 'done' },
];

function Board({ tasks, setTasks }) {
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board">
        {COLUMNS.map(col => (
          <Column
            key={col.title}
            title={col.title}
            className={col.className}
            tasks={tasks.filter(task => task.column === col.title)}
            setTasks={setTasks}
          />
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;