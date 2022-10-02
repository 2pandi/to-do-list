import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";

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

  .checkBox + .checkBox-label > .uncheck {
    color: gray;
  }

  .checkBox:checked + .checkBox-label > .uncheck {
    display: none;
  }

  .checkBox + .checkBox-label > .check {
    display: none;
  }

  .checkBox:checked + .checkBox-label > .check {
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

const List = ({ todoData }) => {
  return (
    <TodoList>
      <h1 className="list-title">To do list ⚡️</h1>
      {todoData.map((data) => (
        <li className="list" key={data.id}>
          <input className="checkBox" id={data.id} type="checkbox" />
          <label className="checkBox-label" htmlFor={data.id}>
            <FontAwesomeIcon className="check circle" icon="fa-check-circle" />
            <FontAwesomeIcon className="uncheck circle" icon="far fa-circle" />
          </label>
          <span className="list-text">{data.todo}</span>
          <del className="list-text-del">{data.todo}</del>
        </li>
      ))}
    </TodoList>
  );
};

export default List;
