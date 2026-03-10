import { useState, useEffect } from 'react';
import Board from './components/Board';
import './App.css';

const INITIAL_TASKS = [
  { id: 1, title: 'Design the logo', description: 'Create a Google-themed logo', column: 'Todo' },
  { id: 2, title: 'Build the navbar', description: 'Responsive top navigation', column: 'Todo' },
  { id: 3, title: 'Setup React project', description: 'Initialize and clean up', column: 'In Progress' },
  { id: 4, title: 'Write README', description: 'Document the project', column: 'Done' },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('kanban-theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={`app ${isDark ? 'dark' : ''}`}>
      <header className="app-header">
        <div className="header-left">
          <div className="header-title-group">
            <span className="header-title">Kanban Board</span>
            <span className="header-subtitle">by Pratham Dev</span>
          </div>
        </div>
        <div className="header-right">
          <button className="theme-toggle" onClick={() => setIsDark(prev => !prev)}>
  <span className="toggle-thumb">
    {isDark ? '🌙' : '☀️'}
  </span>
</button>
          <div className="header-dots">
            <span style={{ background: '#EA4335' }}></span>
            <span style={{ background: '#FBBC05' }}></span>
            <span style={{ background: '#34A853' }}></span>
            <span style={{ background: '#4285F4' }}></span>
          </div>
        </div>
      </header>
      <Board tasks={tasks} setTasks={setTasks} />
      <footer className="app-footer">
        <span>Made by</span>
        <span>by <strong>Pratham Dev</strong></span>
        <span className="footer-dot">·</span>
      </footer>
    </div>
  );
}

export default App;
