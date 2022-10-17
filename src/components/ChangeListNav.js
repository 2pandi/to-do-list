import styled from "styled-components";
import Dropdown from "./Dropdown/Dropdown";

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  .delete {
    width: 60px;
    height: 30px;
    margin-left: 15px;
  }
`;

const ChangeListNav = ({
  setIsDeleting,
  listState,
  setListState,
  isDeleting,
}) => {
  const listStates = ["전체 리스트", "진행중 리스트", "완료 리스트"];

  const onDeleteClick = () => {
    setIsDeleting((pre) => !pre);
  };

  return (
    <StyledDiv className="ChangeListNav">
      <Dropdown
        setListState={setListState}
        listState={listState}
        listStates={listStates}
      />
      {isDeleting ? (
        <button className="delete button" onClick={onDeleteClick}>
          완료
        </button>
      ) : (
        <button className="delete button" onClick={onDeleteClick}>
          삭제
        </button>
      )}
    </StyledDiv>
  );
};

export default ChangeListNav;
