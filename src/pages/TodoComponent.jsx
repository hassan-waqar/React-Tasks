import React, { useState, useEffect, useMemo } from 'react';

function TodoComponent() {
    // State to hold the todo item
    const [todo, setTodo] = useState(null);

    // Mimic componentDidMount
    useEffect(() => {
        console.log('Component mounted');
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(todoData => {
                console.log('Fetched todo:', todoData);
                setTodo(todoData);
            });
        // Cleanup function for componentWillUnmount
        return () => {
            console.log('Component unmounted');
        };
    }, []);

    // Mimic componentDidUpdate
    useEffect(() => {
        console.log('Component updated');
        if (todo) {
            console.log('Todo updated:', todo);
        }
    }, [todo]);

    // Mimic shouldComponentUpdate
    const memoizedTodo = useMemo(() => {
        console.log('Memoized todo');
        return todo;
    }, [todo]);

    // Rendering
    return (
        <div>
            <h1>Todo Component</h1>
            {memoizedTodo && (
                <div>
                    <p>Title: {memoizedTodo.title}</p>
                    <p>Completed: {memoizedTodo.completed ? 'Yes' : 'No'}</p>
                </div>
            )}

            {/*When the button is clicked nothing will happen to the display
            as the object is replaced not updated as memoized (shouldComponentUpdate) todo checks for updation of value.
            Howver componentDidUpdate runs fine as any change in the state will trigger
            function */}

            <button onClick={() => setTodo({
                "userId": 2,
                "id": 2,
                "title": "Hello, My name is Hassan",
                "completed": true
            })}>Click Me !</button>
        </div>
    );
}

export default TodoComponent;
