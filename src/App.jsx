import React from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;

