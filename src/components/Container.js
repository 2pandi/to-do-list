import styled from "styled-components";
import Login from "../pages/Login";
import Todolist from "../pages/Todolist";

const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 500px;
  height: 90vh;
  background-color: white;
  border-radius: 30px;
  overflow-y: scroll;

  @media screen and (max-width: 420px) {
    width: 90vw;
    height: 90vh;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }
  ::-webkit-scrollbar-button {
    display: block;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ede4e0;
    width: 5px;
  }
`;

const Container = ({ isLoggedIn, setIsLoggedIn, userData }) => {
  return (
    <>
      {isLoggedIn ? (
        <StyledContainer className="Container">
          <Todolist userData={userData} />
        </StyledContainer>
      ) : (
        <StyledContainer className="Container">
          <Login setIsLoggedIn={setIsLoggedIn} />
        </StyledContainer>
      )}
    </>
  );
};
export default Container;
