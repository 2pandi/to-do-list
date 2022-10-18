import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import DropdownList from "./DropdownList";

library.add(fas, faCaretDown);

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 110px;

  .dropdown-button {
    background-color: white;
    width: 110px;
    height: 30px;
    border: 1px solid gray;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
  }

  .dropdown-lists {
    width: 100px;
    background-color: white;
    padding: 0;
    position: relative;
    left: 5px;
    z-index: 1;
    border: 0.3px solid lightgray;
    margin: 0;
    cursor: pointer;
  }

  div.dropdown-lists {
    border: none;
  }

  .dropdown-list {
    box-sizing: border-box;
    list-style-type: none;
    width: 100px;
    height: 30px;
    border: 0.3px solid lightgray;
    padding: 5px 5px;
    font-size: 0.8em;
  }

  .dropdown-list:hover {
    background-color: lightgray;
  }
`;

const Dropdown = ({ setListState, listState, listStates }) => {
  const [toggle, setToggle] = useState(false);

  const openToggle = () => {
    setToggle(!toggle);
  };

  return (
    <StyledDropdown className="Dropdown">
      <button className="dropdown-button" type="button" onClick={openToggle}>
        {`${listState} `}
        <FontAwesomeIcon icon="fas fa-caret-down" />
      </button>
      {toggle ? (
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
      ) : (
        <div className="dropdown-lists" />
      )}
    </StyledDropdown>
  );
};

export default Dropdown;
