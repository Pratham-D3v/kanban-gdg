# Kanban Board — GDG on Campus SRM 2026

A Google-themed Kanban task management app built with React.

## Features
- Add, edit, and delete tasks
- Drag and drop tasks between columns
- Move tasks via dropdown
- Tasks persist after page refresh (LocalStorage)
- Google Workspace inspired design

## Tech Stack
- React (useState, useEffect)
- @hello-pangea/dnd (drag and drop)
- Plain CSS
- LocalStorage for persistence

## How to run locally

1. Clone the repository
   git clone https://github.com/YOUR_USERNAME/kanban-gdg.git

2. Install dependencies
   npm install

3. Start the app
   npm start

4. Open in browser
   http://localhost:3000

## Project Structure
```
src/
├── components/
│   ├── Board.jsx        — Kanban board, handles drag and drop
│   ├── Column.jsx       — Individual column with droppable zone
│   ├── Card.jsx         — Task card with edit, delete, move
│   └── AddTaskModal.jsx — Modal popup to add new tasks
├── styles/
│   ├── Board.css
│   ├── Column.css
│   ├── Card.css
│   └── Modal.css
├── App.js               — Root component, holds all state
└── index.css            — Global styles
```

## Built by
Pratham Dev — GDG on Campus SRM Recruitments 2026