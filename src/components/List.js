import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { TODO_SERVER_URL } from "../util/api";

library.add(fas, faCheckCircle);
library.add(far, faCircle);

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 8px;
  margin: 30px 0;

  .list-title {
    margin: 15px 0;
  }

  .checkBox {
    display: none;
  }

  .uncheck {
    color: gray;
  }

  .check {
    display: block;
    color: green;
  }

  .circle {
    margin: 0 20px;
  }

  .list {
    background-color: white;
    height: 3em;
    min-width: 380px;
    border-radius: 15px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
  }

  .list:hover {
    background-color: skyblue;
  }

  .checkBox:checked ~ .list-text {
    display: none;
  }
  .checkBox ~ .list-text-del {
    display: none;
  }
  .checkBox:checked ~ .list-text-del {
    display: block;
  }
`;

const List = ({ todoData, setTodoData }) => {
  const onChange = (e) => {
    const id = +e.target.id;
    const targetData = todoData[todoData.findIndex((v) => v.id === id)];
    const isChecked = e.target.checked;
    setTodoData(
      todoData.map((v) => {
        if (v.id === id) return { ...v, isDone: isChecked };
        return v;
      })
    );
    fetch(TODO_SERVER_URL + id, {
      method: "PATCH",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ ...targetData, isDone: isChecked }),
    });
  };

  return (
    <TodoList>
      <h1 className="list-title">To do list ⚡️</h1>
      {todoData.map((data) => (
        <li className="list" key={data.id}>
          <input
            className="checkBox"
            onChange={onChange}
            id={data.id}
            type="checkbox"
            checked={data.isDone}
          />
          <label className="checkBox-label" htmlFor={data.id}>
            {data.isDone ? (
              <FontAwesomeIcon
                className="check circle"
                icon="fa-check-circle"
              />
            ) : (
              <FontAwesomeIcon
                className="uncheck circle"
                icon="far fa-circle"
              />
            )}
          </label>
          <span className="list-text">{data.todo}</span>
          <del className="list-text-del">{data.todo}</del>
        </li>
      ))}
    </TodoList>
  );
};

export default List;
