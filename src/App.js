import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fbase";
import Container from "./components/Container";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #d3cce3, #e9e4f0);
  display: grid;
  justify-items: center;
  align-items: center;

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
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) setUserData(user);
  });

  // 로그인 영속을 위해 서버 필요
  // useEffect(() => {
  //   if (auth.currentUser) {
  //     setUserData(auth.currentUser);
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [userData]);

  return (
    <>
      {isLoggedIn ? (
        <StyledApp className="App">
          <Header
            className="header"
            setIsLoggedIn={setIsLoggedIn}
            userData={userData}
          />
          <Container
            className="Container"
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userData={userData}
          />
        </StyledApp>
      ) : (
        <StyledApp className="App">
          <Container
            className="Container"
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            userData={userData}
          />
        </StyledApp>
      )}
    </>
  );
}

export default App;
