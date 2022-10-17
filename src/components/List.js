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
import Categories from "./Categories";
import ChangeListNav from "./ChangeListNav";
import { useEffect, useState } from "react";
import {
  doc,
  deleteDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../fbase";

library.add(fas, faCheckCircle, faTrashAlt);
library.add(far, faCircle);

const ListContainer = styled.div`
  box-sizing: border-box;
  width: 78%;
  grid-row: 2/3;
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: 138px auto;

  .list-header {
    grid-row: 1/2;
  }
  .list-title {
    margin: 15px 0 5px 0;
  }
`;

const StyledUl = styled.ul`
  list-style-type: none;
  height: fit-content;
  padding: 0;
  display: grid;
  gap: 8px;
  margin: 0 0 50px 0;
  grid-row: 2/3;

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
    box-sizing: border-box;
    height: 3em;
    min-width: 380px;
    border-radius: 15px;
    font-size: 1.3rem;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    :hover {
      transition: all 0.3s;
    }
  }

  .list.personal {
    border-left: #e2cbff 15px solid;
    :hover {
      background-color: #e2cbff;
    }
  }

  .list.work {
    border-left: #cbdaff 15px solid;
    :hover {
      background-color: #cbdaff;
    }
  }

  .list.wish {
    border-left: #fff9c6 15px solid;
    :hover {
      background-color: #fff9c6;
    }
  }

  .list.etc {
    border-left: #e8f6d0 15px solid;
    :hover {
      background-color: #e8f6d0;
    }
  }

  .edit-list {
    font-size: 0.8em;
    border: none;
    border-bottom: 1px solid black;
    padding: 10px 15px;
  }

  .edit-list:focus {
    outline: none;
  }

  .edit.button {
    height: 30px;
    width: 50px;
    background-color: #009e76;
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
    cursor: pointer;
  }
  .trash {
    color: #ff5159;
    animation: shake 0.4s 0s infinite;
    @keyframes shake {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(5deg);
      }
      50% {
        transform: rotate(0eg);
      }
      75% {
        transform: rotate(-5deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
`;

const List = ({ userData }) => {
  const [todoData, setTodoData] = useState([]);
  const [snapshot, setSnapshot] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTodoId, SetEditingTodoId] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [listState, setListState] = useState("전체 리스트");
  const [authorUid, setAuthorUid] = useState(null);
  const [selectedCategory, SetselectedCategory] = useState(null);
  const [categorySelected, SetCategorySelected] = useState(false);

  useEffect(() => {
    if (userData) {
      setAuthorUid(userData.uid);
    }
  }, [userData]);

  useEffect(() => {
    let q;
    if (listState === "전체 리스트") {
      q = query(
        collection(db, "to-do-list"),
        where("author", "==", authorUid),
        orderBy("isDone", "asc"),
        orderBy("createdAt", "desc")
      );
    }
    if (listState === "완료 리스트") {
      q = query(
        collection(db, "to-do-list"),
        where("author", "==", authorUid),
        where("isDone", "==", true),
        orderBy("createdAt", "desc")
      );
    }
    if (listState === "진행중 리스트") {
      q = query(
        collection(db, "to-do-list"),
        where("author", "==", authorUid),
        where("isDone", "==", false),
        orderBy("createdAt", "desc")
      );
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSnapshot(snapshot);
    });
    return () => {
      if (authorUid) unsubscribe();
    };
  }, [listState, authorUid]);

  useEffect(() => {
    if (snapshot) {
      let todoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (categorySelected) {
        todoArr = todoArr.filter((v) => v.category === selectedCategory);
      }
      setTodoData(todoArr);
    }
  }, [snapshot, categorySelected, selectedCategory]);

  const onCheckboxChange = (e, id) => {
    const isChecked = e.target.checked;
    setDoc(doc(db, `to-do-list/${id}`), { isDone: isChecked }, { merge: true });
  };

  const deleteTodo = (id) => {
    const targetdoc = doc(db, `to-do-list/${id}`);
    deleteDoc(targetdoc);
  };

  const onListClick = (id, todo) => {
    setIsEditing(true);
    SetEditingTodoId(id);
    setInputValue(todo);
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onEditButtonClick = (id) => {
    setDoc(doc(db, `to-do-list/${id}`), { todo: inputValue }, { merge: true });
    setIsEditing(false);
  };

  console.log("렌더링됨");
  return (
    <ListContainer className="List">
      <header className="list-header">
        <h1 className="list-title">To do list ⚡️</h1>
        <Categories
          SetselectedCategory={SetselectedCategory}
          SetCategorySelected={SetCategorySelected}
          selectedCategory={selectedCategory}
        />
        <ChangeListNav
          listState={listState}
          setListState={setListState}
          setIsDeleting={setIsDeleting}
        />
      </header>
      <StyledUl className="list-ul">
        {todoData.map((data) => (
          <li className={`list ${data.category}`} key={data.id}>
            <input
              className="checkBox"
              onChange={(e) => onCheckboxChange(e, data.id)}
              id={`${data.id}check`}
              type="checkbox"
              checked={data.isDone}
            />
            {isEditing && data.id === editingTodoId ? (
              <>
                <input
                  className="edit-list"
                  onChange={onInputChange}
                  value={inputValue}
                  autoFocus
                  // onBlur={() => setIsEditing(false)}
                ></input>
                <button
                  className="edit button"
                  onClick={() => onEditButtonClick(data.id)}
                >
                  수정
                </button>
              </>
            ) : (
              <span
                className="list-text"
                onClick={() => onListClick(data.id, data.todo)}
              >
                {data.todo}
              </span>
            )}
            <del className="list-text del">{data.todo}</del>
            <div className="icon-wrapper">
              <label className="checkBox-label" htmlFor={`${data.id}check`}>
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
                  onClick={() => deleteTodo(data.id)}
                  icon="fas fa-trash-alt"
                />
              )}
            </div>
          </li>
        ))}
      </StyledUl>
    </ListContainer>
  );
};

export default List;
