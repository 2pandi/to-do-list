import styled from "styled-components";

const StyledNav = styled.nav`
  width: 100%;
  background-color: orange;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .tab {
    padding: 15px 50px;
  }
`;
const Nav = () => {
  return (
    <StyledNav>
      <div className="tab">전체</div>
      <div className="tab">미완료</div>
      <div className="tab">완료</div>
    </StyledNav>
  );
};

export default Nav;
