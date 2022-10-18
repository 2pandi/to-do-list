import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../fbase";

const HeaderContainer = styled.div`
  position: absolute;
  display: flex;
  align-self: flex-start;
  justify-self: flex-end;

  .logout.button {
    width: 80px;
    height: 30px;
    margin: 3px 50px 0 0;

    @media screen and (max-width: 420px) {
      margin: 5px 20px 0 0;
      font-size: 0.8em;
      height: 23px;
      width: 60px;
    }
  }
  .greetings {
    margin: 9px;
    font-weight: 600;

    @media screen and (max-width: 420px) {
      font-size: 0.8em;
      margin: 10px;
    }
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
    <HeaderContainer className="Header">
      {userName && <span className="greetings">Hi, {userName}!</span>}
      <button className="logout button" onClick={onLogoutClick}>
        Logout
      </button>
    </HeaderContainer>
  );
};

export default Header;
