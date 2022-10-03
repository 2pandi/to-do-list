import styled from "styled-components";
import Tab from "./Tab";

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Categories = () => {
  return (
    <Navbar>
      <Tab color="#E2CBFF" icon="fas fa-child" desc="Personal" />
      <Tab color="#CBDAFF" icon="fas fa-briefcase" desc="Work" />
      <Tab color="#FFF9C6" icon="far fa-star" desc="Wish" />
      <Tab color="#E8F6D0" icon="fas fa-ellipsis-h" desc="etc" />
    </Navbar>
  );
};

export default Categories;
