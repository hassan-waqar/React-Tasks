import './App.css';
import About from "./About";
import NoteState from "./context/NoteState";

function App() {
  return (
    <NoteState>
      <About/>
    </NoteState>
  );
}

export default App;
