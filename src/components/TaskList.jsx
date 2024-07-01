import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, editTodo, toggleCompleted } from "../features/todo/todoSlice";

function TaskList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [todoMsg, setTodoMsg] = useState('');

  const editTodoHandler = (todo) => {
    dispatch(editTodo({
      id: todo.id,
      text: todoMsg || todo.text
    }));
    setEditableTodoId(null);
    setTodoMsg('');
  };

  const toggleCompletedHandler = (id) => {
    dispatch(toggleCompleted(id));
  };

  const deleteTodoHandler = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3 bg-white shadow">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.completed}
            onChange={() => toggleCompletedHandler(todo.id)}
          />
          <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg px-2 ${
              todo.completed ? "line-through" : ""
            } ${editableTodoId === todo.id ? "border-gray-300" : "border-transparent"}`}
            value={editableTodoId === todo.id ? todoMsg : todo.text}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={editableTodoId !== todo.id}
          />
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              if (todo.completed) return;
              if (editableTodoId === todo.id) {
                editTodoHandler(todo);
              } else {
                setEditableTodoId(todo.id);
                setTodoMsg(todo.text);
              }
            }}
            disabled={todo.completed}
          >
            {editableTodoId === todo.id ? "📁" : "✏️"}
          </button>
          <button
            className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-100 hover:bg-gray-200"
            onClick={() => deleteTodoHandler(todo.id)}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
