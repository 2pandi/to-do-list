import { useState } from "react";
import styled from "styled-components";
import DropdownList from "./DropdownList";

const StyledDiv = styled.div`
  background-color: lightgray;
  display: flex;
  justify-content: flex-end;

  .dropdown-button {
    background-color: skyblue;
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 5px;
  }

  .dropdown-lists {
    background-color: white;
    padding: 0;
    position: absolute;
    z-index: 1;
    border: 0.3px solid lightgray;
  }

  .dropdown-list {
    list-style-type: none;
    width: 90px;
    height: 30px;
  }

  .dropdown-list:hover {
    background-color: lightgray;
  }
`;

const ChangeList = ({ setIsDeleting }) => {
  const [toggle, setToggle] = useState(false);
  const [listState, setListState] = useState("진행중");
  const listStates = ["진행중", "전체", "완료"];

  const openToggle = () => {
    setToggle(!toggle);
  };

  const onDeleteClick = () => {
    setIsDeleting((pre) => !pre);
  };

  return (
    <StyledDiv>
      <button className="dropdown-button" onClick={openToggle}>
        {listState}
      </button>
      {toggle && (
        <ul className="dropdown-lists">
          {listStates.map((v, idx) => (
            <DropdownList
              key={idx}
              setListState={setListState}
              setToggle={setToggle}
              value={v}
            />
          ))}
        </ul>
      )}
      <button onClick={onDeleteClick}>삭제</button>
    </StyledDiv>
  );
};

export default ChangeList;
