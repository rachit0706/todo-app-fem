import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import "./TodoPage.css";

function TodoAdder({ addItem }) {
    return (
        <div className="todo-adder">
            <span className="checkbox"></span>
            <input type="text" placeholder="Create a new todo..." onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addItem(e.target.value);
                    e.target.value = '';
                }
            }} />
        </div>
    );
}

function TodoItem({ details, remove, markComplete }) {
    return (
        <div className="todo-item">
            <div className={details.completed ? "mark completed" : "mark"} onClick={() => markComplete(details.id)}>
                <span className="checkbox">
                    {details.completed && <img src="../images/icon-check.svg" alt=".." className="check-icon" />}
                </span>
                <p className="todo-text">{details.text}</p>
            </div>
            <img src="../images/icon-cross.svg" alt="Remove Todo" className="remove-button" onClick={() => remove(details.id)} />
        </div>
    );
}

function FilterItem({ label, handleFilter }) {
    return (
        <li className="filter" onClick={() => handleFilter(label)}>{label}</li>
    );
}

export default function TodoPage({handleTheme, currTheme}) {
    
    const [todoItems, setTodoItems] = useState([]);
    const [filters, setFilters] = useState('all');
    const [filterItems, setFilterItems] = useState(todoItems);
    const [itemsLeft, setItemsLeft] = useState(0);
    
    useEffect(() => {
        let savedArr = JSON.parse(localStorage.getItem('todoList'));

        if(savedArr) {
            setTodoItems(savedArr);
        }else {
            setTodoItems([]);
        }

        console.log(filterItems);
    }, []);

    useEffect(() => {
        const activeItems = todoItems.filter(item => !item.completed);
        
        window.localStorage.setItem('todoList', JSON.stringify(todoItems));
        setFilterItems(todoItems);
        setItemsLeft(activeItems.length);
    }, [todoItems]);

    useEffect(() => {
        filterTodo(filters);
    }, [filters]);

    const addTodo = (text) => {
        setTodoItems(prevItems => {
            const newItem = {
                id: uuid(),
                text: text,
                completed: false
            }
            return [...prevItems, newItem];
        })
    }

    const removeTodo = (id) => {
        const currList = [...todoItems];

        for (let i = 0; i < currList.length; i++) {
            if (currList[i].id === id) {
                console.log(currList[i])
                currList.splice(i, 1);
                break;
            }
        }

        setTodoItems(currList);
    }

    const markComplete = (id) => {
        const currList = [...todoItems];

        currList.forEach(item => {
            if (id === item.id) {
                if (item.completed) {
                    return;
                } else {
                    item.completed = true;
                }
            }
        });

        setTodoItems(currList);
    }

    const clearCompleted = () => {
        const newItems = todoItems.filter(item => !item.completed);

        setTodoItems(newItems);
    }

    const filterTodo = (type) => {
        setFilters(type)

        let filteredTodos = [];
        if (type === 'all') {
            filteredTodos = todoItems.filter(item => item);
        } else if (type === 'active') {
            filteredTodos = todoItems.filter(item => item.completed === false);
        } else if (type === 'completed') {
            filteredTodos = todoItems.filter(item => item.completed === true);
        } else {
            return true;
        }

        setFilterItems(filteredTodos);
    }

    return (
        <div className="todo-page">
            <div className="page-heading">
                <h1>TODO</h1>
                <img src={currTheme.buttonIcon} alt=".." className="theme-button" onClick={() => handleTheme()} />
            </div>
            <TodoAdder addItem={addTodo} />
            <div className="todo-list">
                {filterItems.map(item => <TodoItem details={item} key={item.id} remove={removeTodo} markComplete={markComplete} />)}
                <div className="bottom-panel">
                    <span className="items-left">{itemsLeft} items left</span>
                    <ul className="filter-panel-large">
                        {['all', 'active', 'completed'].map(filter => <FilterItem label={filter} key={filter} handleFilter={setFilters} />)}
                    </ul>
                    <span className="clear-completed" onClick={() => clearCompleted()}>Clear completed</span>
                </div>
            </div>
            <ul className="filter-panel-small">
                {['all', 'active', 'completed'].map(filter => <FilterItem label={filter} key={filter} handleFilter={setFilters} />)}
            </ul>
        </div>
    );
}