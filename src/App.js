import AddList from "./components/AddList";
import List from "./components/List";
import Nav from "./components/Nav";
import styled from "styled-components";

const StyledApp = styled.div`
  max-width: 100vw;
  display: grid;
  flex-direction: column;
  justify-items: center;
`;

function App() {
  return (
    <StyledApp className="App">
      <AddList />
      <List />
      <Nav />
    </StyledApp>
  );
}

export default App;
