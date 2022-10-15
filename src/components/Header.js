import { signOut } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../fbase";

const HeaderContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;

  .logout.button {
    width: 80px;
    height: 30px;
    margin: 10px 50px 0 0;
  }
`;

const Header = ({ setIsLoggedIn }) => {
  const onLogoutClick = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <HeaderContainer>
      <button className="logout button" onClick={onLogoutClick}>
        Logout
      </button>
    </HeaderContainer>
  );
};

export default Header;
