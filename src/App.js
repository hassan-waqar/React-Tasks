import './App.css';
import { Container } from "@mui/material";
import ToDoList from "./pages/ToDoList"

function App() {
    return (
        <Container maxWidth="md" style={{textAlign: "center"}}>
            <Container style={{ height: '60px' }} />
            <h1> ToDo List </h1>
            <ToDoList/>
        </Container>
    );
}

export default App;
