import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faChild,
  faEllipsisH,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

library.add(fas, faChild, faBriefcase, faEllipsisH);
library.add(far, faStar);

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.div`
  width: 80px;
  height: 2em;
  background-color: ${(props) => props.color};
  font-size: 0.9em;
  border-radius: 8px;
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .icon {
    margin: 0 5px;
  }
`;

const Categories = () => {
  return (
    <Navbar>
      <Tab color="#E2CBFF">
        <FontAwesomeIcon className="icon" icon="fas fa-child" />
        Personal
      </Tab>
      <Tab color="#CBDAFF">
        <FontAwesomeIcon className="icon" icon="fas fa-briefcase" />
        Work
      </Tab>
      <Tab color="#FFF9C6">
        <FontAwesomeIcon className="icon" icon="far fa-star" />
        Wish
      </Tab>
      <Tab color="#E8F6D0">
        <FontAwesomeIcon className="icon" icon="fas fa-ellipsis-h" />
        etc
      </Tab>
    </Navbar>
  );
};

export default Categories;
