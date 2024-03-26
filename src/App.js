import './App.css';
import { Container } from "@mui/material";
import ToDoList from "./pages/ToDoList"
import TodoComponent from "./pages/TodoComponent";
import ParentComponent from "./pages/ParentComponent";

function App() {
    return (
        <Container maxWidth="md" style={{textAlign: "center"}}>
            {/*<Container style={{ height: '60px' }} />*/}
            {/*<h1> ToDo List </h1>*/}
            {/*<ToDoList/>*/}

            {/*<TodoComponent/>*/}

            <ParentComponent/>
        </Container>
    );
}

export default App;
