import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([ { id: todos.length + 1, title: newTodo, completed: false },...todos]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setNewTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    if (newTodo.trim()) {
      setTodos(
        todos.map((todo) => (todo.id === editTodo.id ? { ...todo, title: newTodo } : todo))
      );
      setEditTodo(null);
      setNewTodo('');
    }
  };

  const handleToggleStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const pageNumbersToRender = [];
    const maxPageNumbersToShow = 1;
    const startIndex = Math.max(currentPage - 1, 0);
    const endIndex = Math.min(startIndex + maxPageNumbersToShow, totalPages);

    for (let i = startIndex; i < endIndex; i++) {
      pageNumbersToRender.push(pageNumbers[i]);
    }

    return (
      <div className="flex items-center justify-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          } p-2 rounded-l-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-white`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="bg-gray-900 rounded-md shadow-md">
          {pageNumbersToRender.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`${
                currentPage === number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } px-3 py-2 transition-colors duration-200 font-semibold`}
            >
              {number}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          } p-2 rounded-r-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-white`}
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <h1 className="text-xl md:hidden text-white px-6 py-4 font-semibold">Todo App</h1>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-700 text-white flex items-center justify-between">
            <h1 className="text-xl hidden sm:block font-semibold">Todo App</h1>
            <div className="flex items-center">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                className="rounded-md md:w-80 px-4 py-2 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2"
              />
              <button
                onClick={editTodo ? handleUpdateTodo : handleAddTodo}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors duration-200 flex items-center"
              >
                {editTodo ? (
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {editTodo ? 'Update' : 'Add'}
              </button>
              </div>
          </div>
          <div className="px-6 py-4">
            <ul>
              {currentTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="bg-gray-700 rounded-md shadow-sm mb-2 p-4 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => handleToggleStatus(todo.id)}
                      className={`${
                        todo.completed
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-500 hover:bg-gray-600'
                      } p-2 rounded-full mr-4 transition-colors duration-200`}
                    >
                      {todo.completed ? (
                        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                    <span
                      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                      className={`${
                        todo.completed ? 'text-gray-500' : 'text-white'
                      } flex-grow`}
                    >
                      {todo.title}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleEditTodo(todo)}
                      className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-500 transition-colors duration-200 mr-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-4 bg-gray-700">
            <div className="flex justify-center">{renderPageNumbers()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;