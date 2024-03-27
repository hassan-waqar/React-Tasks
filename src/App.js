import React from 'react';
import ClassCar from './components/ClassCar'; // Assuming both files are in the same directory
import CarFunctional from "./components/CarFunctional"

function App() {
    return (
        <div>
            <h1>Welcome to App</h1>
            {/*<ClassCar message="Hello from App" /> /!* Passing the prop *!/*/}
            <CarFunctional message="Hello from App" /> {/* Passing the prop */}

        </div>
    );
}

export default App;
