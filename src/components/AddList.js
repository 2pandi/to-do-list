import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../fbase";

const Container = styled.form`
  width: 80%;
  max-width: 390px;
  height: 180px;
  margin-top: 50px;
  border-radius: 30px;
  background-color: #e2cbff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 3;

  .input-box {
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 10px 15px;
    margin: 10px 20px 30px 20px;
  }

  .input-box:focus {
    outline: none;
  }
  .add-list {
    width: 90px;
    height: 30px;
    margin-left: 20px;
    border: none;
    border-radius: 20px;
    background-color: #494949;
    color: white;
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

const AddList = () => {
  const [todo, setTodo] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const createdAt = new Date().toLocaleString();
    const data = { todo, createdAt, isDone: false };
    await addDoc(collection(db, "to-do-list"), data);
    setTodo("");
  };

  const onChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <Container onSubmit={onSubmit}>
        <input
          onChange={onChange}
          className="input-box"
          type="text"
          value={todo}
          placeholder="할 일을 적어주세요"
        />
        <button className="add-list">Add list</button>
      </Container>
      <Shadow1></Shadow1>
      <Shadow2></Shadow2>
    </>
  );
};

export default AddList;
