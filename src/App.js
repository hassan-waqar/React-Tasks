import useLocalStorage from "./useLocalStorage";
import useUpdateLogger from "./useUpdateLogger";
import Form from "./Form";

function App() {
  const [name, setName] = useLocalStorage("name", "")
    useUpdateLogger(name)
  return (
    <>
      {/*<input*/}
      {/*  type = "text"*/}
      {/*  value={name}*/}
      {/*  onChange={(e) => setName(e.target.value)}*/}
      {/*/>*/}
      <Form/>
    </>
  );
}

export default App;
