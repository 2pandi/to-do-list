import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
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
  .greetings {
    margin: 17px;
  }
`;

const Header = ({ setIsLoggedIn, userData }) => {
  const [userName, setUserName] = useState(null);
  const onLogoutClick = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (userData) {
      if (userData.displayName) setUserName(userData.displayName);
      else {
        const idx = userData.email.indexOf("@");
        const emailHead = userData.email.substring(0, idx);
        setUserName(emailHead);
      }
    }
  }, [userData]);

  return (
    <HeaderContainer>
      {userName && <span className="greetings">hi, {userName}!</span>}
      <button className="logout button" onClick={onLogoutClick}>
        Logout
      </button>
    </HeaderContainer>
  );
};

export default Header;
