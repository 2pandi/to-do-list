import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../fbase";

const StyledJoin = styled.div`
  box-sizing: border-box;
  max-width: 500px;
  height: 250px;
  top: 150px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(3, 39px 22px);
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
    height: 3em;
    grid-column: 1/3;
    grid-row: 7/8;
  }
  .Joined {
    grid-column: 1/3;
    grid-row: 1/7;
    font-size: 1.5em;
  }
  .warning {
    grid-column: 2/3;
    justify-self: start;
  }
`;

const Join = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [CPw, setCPw] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [validPw, setValidPw] = useState(true);
  const [validCPw, setValidCPw] = useState(true);
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

  const validateEmail = (email) => {
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  const validatePw = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };

  useEffect(() => {
    if (email !== "") {
      setValidEmail(validateEmail(email));
    }
    if (pw !== "") {
      setValidPw(validatePw(pw));
    }
    if (CPw !== "") {
      setValidCPw(pw === CPw);
    }
  }, [email, pw, CPw]);

  return (
    <>
      {isJoined ? (
        <StyledJoin>
          <div className="Joined">Thank you for Joining!🥰</div>
        </StyledJoin>
      ) : (
        <StyledJoin>
          <label className="email join-label">Email</label>
          <input
            className="join-input"
            type="email"
            onChange={onEmailChange}
            value={email}
          ></input>
          {validEmail ? (
            <div />
          ) : (
            <div className="warning">Invalid Email.🥵</div>
          )}
          <label className="password join-label">Password</label>
          <input
            className="join-input"
            onChange={onPwChange}
            value={pw}
            type="password"
          ></input>
          {validPw ? (
            <div />
          ) : (
            <div className="warning">Invalid Password.🥵</div>
          )}
          <label className="confirm-password join-label">{`Confirm\nPassword`}</label>
          <input
            className="join-input"
            onChange={onCPwChange}
            value={CPw}
            type="password"
          ></input>
          {validCPw ? (
            <div />
          ) : (
            <div className="warning">Passwords do not match.🥵</div>
          )}
          <button className="join button" onClick={onJoinClick}>
            Join
          </button>
        </StyledJoin>
      )}
    </>
  );
};

export default Join;
