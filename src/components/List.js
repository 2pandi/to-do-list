import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faCircle,
  fas,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
import { TODO_SERVER_URL } from "../util/api";
import Categories from "./Categories";
import ChangeList from "./ChangeList";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../fbase";

library.add(fas, faCheckCircle, faTrashAlt);
library.add(far, faCircle);

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  gap: 8px;
  margin: 30px 0;

  .list-title {
    margin: 15px 0 5px 0;
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

  .list {
    background-color: white;
    height: 3em;
    min-width: 380px;
    border-radius: 15px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list:hover {
    background-color: skyblue;
  }

  .checkBox:checked ~ .list-text {
    display: none;
  }
  .checkBox ~ .del {
    display: none;
  }
  .checkBox:checked ~ .del {
    display: block;
  }

  .icon-wrapper {
    display: flex;
  }
  .icon {
    margin: 0 5px;
    font-size: 1.7rem;
  }
  .trash {
    color: red;
  }
`;

const List = ({ todoData, setTodoData }) => {
  const [isDeleting, setIsDeleting] = useState(false);

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

  const deleteTodo = async (e) => {
    const docId = e.target.id;
    await deleteDoc(doc(db, "to-do-list", docId)).then(console.log("deleted"));
  };

  return (
    <TodoList>
      <h1 className="list-title">To do list ⚡️</h1>
      <Categories />
      <ChangeList setIsDeleting={setIsDeleting} />
      {todoData.map((data) => (
        <li className="list" key={data.id}>
          <input
            className="checkBox"
            onChange={onChange}
            id={data.id}
            type="checkbox"
            checked={data.isDone}
          />
          <span className="list-text">{data.todo}</span>
          <del className="list-text del">{data.todo}</del>
          <div className="icon-wrapper">
            <label className="checkBox-label" htmlFor={data.id}>
              {data.isDone ? (
                <FontAwesomeIcon
                  className="check icon"
                  icon="fa-check-circle"
                />
              ) : (
                <FontAwesomeIcon
                  className="uncheck icon"
                  icon="far fa-circle"
                />
              )}
            </label>
            {isDeleting && (
              <FontAwesomeIcon
                className="trash icon"
                id={data.id}
                onClick={deleteTodo}
                icon="fas fa-trash-alt"
              />
            )}
          </div>
        </li>
      ))}
    </TodoList>
  );
};

export default List;
