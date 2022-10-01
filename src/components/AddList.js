import { useState } from "react";
import styled from "styled-components";

const Container = styled.form`
  width: 80%;
  min-height: 200px;
  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .input-box {
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 10px 15px;
  }

  .input-box:focus {
    outline: none;
  }
  .add-list {
    width: 90px;
    height: 30px;
  }
`;

const AddList = () => {
  const [input, setInput] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <Container onSubmit={onSubmit}>
      <input
        onChange={onChange}
        className="input-box"
        type="text"
        value={input}
        placeholder="할 일을 적어주세요"
      />
      <button className="add-list">Add list</button>
    </Container>
  );
};

export default AddList;
