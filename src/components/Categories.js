import styled from "styled-components";
import Tab from "./Tab";

const Navbar = styled.nav`
  width: 100%;
  display: grid;
  justify-content: space-between;
  gap: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .Tab {
    grid-row: 1/2;
  }

  .Tab.selected {
    border: 0.5px solid gray;
  }

  @media screen and (max-width: 420px) {
    .Tab {
      font-size: 0.75em;
      .tab-icon {
        display: none;
      }
    }
  }
`;

const Categories = ({
  setSelectedCategory,
  setCategorySelected,
  selectedCategory,
}) => {
  const onTabClick = (desc) => {
    const innerText = desc.toLowerCase();
    if (selectedCategory !== innerText) {
      setSelectedCategory(innerText);
      setCategorySelected(true);
    } else {
      setSelectedCategory(null);
      setCategorySelected(false);
    }
  };

  return (
    <Navbar className="Categories">
      <Tab
        color="#E2CBFF"
        icon="fas fa-child"
        desc="Personal"
        onClick={onTabClick}
        selectedCategory={selectedCategory}
      />
      <Tab
        color="#CBDAFF"
        icon="fas fa-briefcase"
        desc="Work"
        onClick={onTabClick}
        selectedCategory={selectedCategory}
      />
      <Tab
        color="#FFF9C6"
        icon="far fa-star"
        desc="Wish"
        onClick={onTabClick}
        selectedCategory={selectedCategory}
      />
      <Tab
        color="#E8F6D0"
        icon="fas fa-ellipsis-h"
        desc="etc"
        onClick={onTabClick}
        selectedCategory={selectedCategory}
      />
    </Navbar>
  );
};

export default Categories;
