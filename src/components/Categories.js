import styled from "styled-components";
import Tab from "./Tab";

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Categories = ({
  SetselectedCategory,
  SetCategorySelected,
  selectedCategory,
}) => {
  const onTabClick = (desc) => {
    const innerText = desc.toLowerCase();
    if (selectedCategory !== innerText) {
      SetselectedCategory(innerText);
      SetCategorySelected(true);
    } else {
      SetCategorySelected(false);
    }
  };

  return (
    <Navbar className="Categories">
      <Tab
        color="#E2CBFF"
        icon="fas fa-child"
        desc="Personal"
        onClick={onTabClick}
      />
      <Tab
        color="#CBDAFF"
        icon="fas fa-briefcase"
        desc="Work"
        onClick={onTabClick}
      />
      <Tab
        color="#FFF9C6"
        icon="far fa-star"
        desc="Wish"
        onClick={onTabClick}
      />
      <Tab
        color="#E8F6D0"
        icon="fas fa-ellipsis-h"
        desc="etc"
        onClick={onTabClick}
      />
    </Navbar>
  );
};

export default Categories;
