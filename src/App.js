import { useEffect, useState } from "react";
import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";

const StyledApp = styled.div`
  max-width: 500px;
  background-color: wheat;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [todoData, setTodoData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodoData(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <StyledApp className="App">
      <AddList />
      <List todoData={todoData} />
      <Nav />
    </StyledApp>
  );
}

export default App;
