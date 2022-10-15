import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";
import { useState } from "react";
import Login from "./pages/Login";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fbase";

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
  const [userData, setUserData] = useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) setUserData(user);
  });
  return (
    <>
      {isLoggedIn ? (
        <StyledApp className="App">
          <Header setIsLoggedIn={setIsLoggedIn} userData={userData} />
          <AddList userData={userData} />
          <List userData={userData} />
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
