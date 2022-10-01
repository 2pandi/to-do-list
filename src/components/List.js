import styled from "styled-components";

const TodoList = styled.ul`
  background-color: white;
  list-style-type: none;
  display: grid;
  gap: 10px;

  .checkBox {
    grid-column: 1/2;
  }
`;

const List = ({ todoData }) => {
  return (
    <TodoList>
      {todoData.map((data) => (
        <>
          <input className="checkBox" type="checkbox" />
          <li className="list" key={data.id}>
            {data.todo}
          </li>
        </>
      ))}
    </TodoList>
  );
};

export default List;
