import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faChild,
  faEllipsisH,
  fas,
} from "@fortawesome/free-solid-svg-icons";
import { far, faStar } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

library.add(fas, faChild, faBriefcase, faEllipsisH);
library.add(far, faStar);

const Div = styled.div`
  width: 80px;
  height: 2em;
  background-color: ${(props) => props.color};
  font-size: 0.9em;
  border-radius: 8px;
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .div-icon {
    margin: 0 5px;
  }
`;

const Tab = ({ color, icon, desc }) => {
  return (
    <Div className="Tab" color={color}>
      <FontAwesomeIcon className="div-icon" icon={icon} />
      {desc}
    </Div>
  );
};

export default Tab;
