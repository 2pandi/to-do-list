import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../fbase";

const StyledJoin = styled.div`
  box-sizing: border-box;
  max-width: 500px;
  height: 250px;
  top: 150px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-items: center;
  align-items: center;
  z-index: 4;
  .join-label {
    grid-column: 1/2;
    margin-right: 10px;
    width: 92px;
  }
  .join-input {
    width: 100%;
    grid-column: 2/3;
    height: 2em;
  }
  .join.button {
    width: 100%;
    grid-column: 1/3;
    height: 3em;
  }
  .Joined {
    grid-column: 1/3;
    font-size: 1.5em;
  }
`;

const Join = () => {
  const [email, setEmail] = useState(null);
  const [pw, setPw] = useState(null);
  const [CPw, setCPw] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPwChange = (e) => setPw(e.target.value);
  const onCPwChange = (e) => setCPw(e.target.value);
  const onJoinClick = () => {
    if (email && pw && pw === CPw)
      createUserWithEmailAndPassword(auth, email, pw)
        .then(() => {
          setIsJoined(true);
        })
        .catch((e) => console.log(e));
  };

  return (
    <>
      {isJoined ? (
        <StyledJoin>
          <div className="Joined">Thank you for Joining 🥰</div>
        </StyledJoin>
      ) : (
        <StyledJoin>
          <label className="email join-label">Email</label>
          <input
            className="join-input"
            onChange={onEmailChange}
            value={email}
          ></input>
          <label className="password join-label">Password</label>
          <input
            className="join-input"
            onChange={onPwChange}
            value={pw}
            type="password"
          ></input>
          <label className="confirm-password join-label">{`Confirm\nPassword`}</label>
          <input
            className="join-input"
            onChange={onCPwChange}
            value={CPw}
            type="password"
          ></input>
          <button className="join button" onClick={onJoinClick}>
            Join
          </button>
        </StyledJoin>
      )}
    </>
  );
};

export default Join;
