import styled from "styled-components";
import AddList from "../components/AddList";
import List from "../components/List";

const StyledTodolist = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  grid-template-rows: 260px auto;

  @media screen and (max-width: 420px) {
    grid-template-rows: 250px auto;
  }
`;

const Todolist = ({ userData }) => {
  return (
    <StyledTodolist className="Todolist">
      <AddList className="AddList" userData={userData} />
      <List userData={userData} />
    </StyledTodolist>
  );
};

export default Todolist;
