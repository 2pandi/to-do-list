const DropdownList = ({ setListState, setToggle, value }) => {
  const sortList = (e) => {
    const text = e.target.innerText;
    setListState(text);
    setToggle((prev) => !prev);
  };
  return (
    <li className="dropdown-list" onClick={sortList}>
      {value}
    </li>
  );
};

export default DropdownList;
