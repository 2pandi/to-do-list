import { useEffect, useState } from "react";
import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./fbase";

const StyledApp = styled.div`
  max-width: 100vw;
  display: grid;
  flex-direction: column;
  justify-items: center;
`;

function App() {
  const [todoData, setTodoData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "to-do-list"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const todoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodoData(todoArr);
    });
  }, []);

  return (
    <StyledApp className="App">
      <AddList />
      <List setTodoData={setTodoData} todoData={todoData} />
      <Nav />
    </StyledApp>
  );
}

export default App;
