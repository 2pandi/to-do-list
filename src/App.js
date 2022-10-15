import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";
import { useState } from "react";
import Login from "./pages/Login";
import Header from "./components/Header";

const StyledApp = styled.div`
  max-width: 100vw;
  display: grid;
  flex-direction: column;
  justify-items: center;

  .button {
    border: none;
    border-radius: 20px;
    background-color: #494949;
    color: white;
    :hover {
      cursor: pointer;
    }
  }
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <StyledApp className="App">
          <Header setIsLoggedIn={setIsLoggedIn} />
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
