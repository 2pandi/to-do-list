import { addDoc, collection } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../fbase";
import Dropdown from "./Dropdown/Dropdown";

const Container = styled.form`
  width: 80%;
  max-width: 390px;
  height: 180px;
  border-radius: 30px;
  background-color: #e2cbff;
  margin-top: 50px;
  display: grid;
  grid-column: 1/2;
  grid-row: 1/2;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 114px auto;
  z-index: 3;

  .input-box {
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 30px 15px 0 15px;
    margin: 10px 20px 30px 20px;
    grid-column: 1/3;
  }

  .input-box:focus {
    outline: none;
  }

  .add-list.button {
    width: 90px;
    height: 30px;
    margin-left: 20px;
    grid-column: 1/2;
    grid-row: 2/3;
  }

  .Dropdown {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`;
const Shadow1 = styled.div`
  width: 70%;
  max-width: 350px;
  height: 150px;
  margin-top: 90px;
  border-radius: 30px;
  background-color: #cbdaff;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 2;
  transform: rotate(-4.5deg);
`;
const Shadow2 = styled.div`
  width: 60%;
  max-width: 300px;
  height: 120px;
  margin-top: 130px;
  border-radius: 30px;
  background-color: #fff9c6;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 1;
  transform: rotate(-9deg);
`;

const AddList = ({ userData }) => {
  const [todo, setTodo] = useState("");
  const [author, setAuthor] = useState(null);
  const [isSubmitting, SetisSubmitting] = useState(false);
  const [category, SetCategory] = useState("personal");
  const categories = ["personal", "work", "wish", "etc"];
  const todoInput = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (todo === "") {
      todoInput.current.focus();
      return null;
    }

    if (!isSubmitting) {
      SetisSubmitting(true);
      const createdAt = new Date().toLocaleString();
      const data = { todo, createdAt, author, category, isDone: false };
      setTodo("");
      await addDoc(collection(db, "to-do-list"), data);
      SetisSubmitting(false);
    }
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    if (userData) {
      setAuthor(userData.uid);
    }
  }, [userData]);

  return (
    <>
      <Container className="AddList" onSubmit={onSubmit}>
        <input
          className="input-box"
          onChange={onChange}
          type="text"
          value={todo}
          placeholder="할 일을 적어주세요"
          ref={todoInput}
          required
        />
        <button className="add-list button" type="button" onClick={onSubmit}>
          Add list
        </button>
        <Dropdown
          setListState={SetCategory}
          listState={category}
          listStates={categories}
        />
      </Container>
      <Shadow1 className="AddList-shadow"></Shadow1>
      <Shadow2 className="AddList-shadow"></Shadow2>
    </>
  );
};

export default AddList;
