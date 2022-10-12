import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";
import { useState } from "react";
import Login from "./pages/Login";

const StyledApp = styled.div`
  max-width: 100vw;
  display: grid;
  flex-direction: column;
  justify-items: center;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <StyledApp className="App">
          <AddList />
          <List />
          <Nav />
        </StyledApp>
      ) : (
        <StyledApp className="App">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </StyledApp>
      )}
    </>
  );
}

export default App;
