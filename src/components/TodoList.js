import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');


  const handleClick = () => {

  };

  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch('http://localhost:8000/todos')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // ketika Rest API sukses, simpan data dari response ke dalam state lokal
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === 'AbortError') {
            console.log('fetch aborted.');
          }
        });
    }
  }, [isRefresh, setRefresh]);

  //filter data

  const filteredData = filter === 'all' ? todos : filter === 'complete' ? todos.filter((item) => item.complete === true) : filter === 'todo' && todos.filter((item) => item.complete === false);

  return (
    <>
      <div id="todo-header" className="header">
        <h2>TodoSearch</h2>
        <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search Todo..." />
        <span className="add-button">Search</span>
      </div>
      <h2 className='todotext'>TodoList</h2>
      <div className="listButton">
        
        <button
          className="btn-filter"
          onClick={() => {
            handleClick('');
            setFilter('all');
          }}
        >
          All
        </button>
        <button
          className="btn-filter"
          onClick={() => {
            handleClick('');
            setFilter('complete');
          }}
        >
          Done
        </button>
        <button
          className="btn-filter"
          onClick={() => {
            handleClick('');
            setFilter('todo');
          }}
        >
          Todo
        </button>
      </div>
      <ul id="todo-list">
        {filteredData
          .filter((item) => {
            return search.toLowerCase() === '' ? item : item.task.toLowerCase().includes(search);
          })
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} setRefresh={setRefresh} />
          ))}
      </ul>
    </>
  );
};

export default TodoList;
