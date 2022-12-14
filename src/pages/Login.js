import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../fbase";
import googleIcon from "../icons/google-icon.png";
import githubIcon from "../icons/github-icon.png";
import LoginIcon from "../components/LoginIcon";
import Modal from "./Modal";
import Join from "../components/Join";

const StyledLogin = styled.div`
  display: grid;
  justify-items: center;
  grid-template-rows: 230px 100px 100px auto;

  .login-form {
    width: 80%;
    max-width: 390px;
    height: 180px;
    border-radius: 30px;
    background-color: #e2cbff;
    color: #494949;
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    grid-template-rows: 1fr 1fr 2fr;
    flex-direction: column;
    grid-row: 1/2;
    grid-column: 1/2;
    z-index: 3;
    @media screen and (max-width: 420px) {
      width: 90%;
      margin-top: 30px;
    }
  }

  .label {
    margin-left: 30px;
    height: 1.5em;
  }

  .idL {
    margin-top: 36px;
  }

  .passwordL {
    margin-top: 15px;
  }

  .input-box {
    height: 1.5em;
    width: 180px;
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 0 15px;
    margin: 0 30px 0 20px;
    grid-column: 2/3;
    color: #494949;

    @media screen and (max-width: 420px) {
      width: 60%;
    }
  }

  .idI {
    margin-top: 32px;
  }

  .passwordI {
    margin-top: 12px;
  }

  .input-box:focus {
    outline: none;
  }
  .login-button {
    width: 90px;
    height: 30px;
    margin: 20px 0 0 20px;
    border: none;
    border-radius: 20px;
    background-color: #494949;
    color: white;
    cursor: pointer;
    grid-column: 1/2;
    grid-row: 3/4;
  }
  .join {
    height: 2em;
    width: fit-content;
    grid-column: 2/3;
    grid-row: 3/4;
    margin: 25px 0 0 20px;
  }
  .join:hover {
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
  }
`;
const Shadow1 = styled.div`
  min-width: 70%;
  max-width: 340px;
  height: 150px;
  margin-top: 90px;
  border-radius: 30px;
  background-color: #cbdaff;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 2;
  transform: rotate(-4.5deg);

  @media screen and (max-width: 420px) {
    width: 80%;
    margin-top: 70px;
  }
`;
const Shadow2 = styled.div`
  min-width: 60%;
  max-width: 290px;
  height: 120px;
  margin-top: 130px;
  border-radius: 30px;
  background-color: #fff9c6;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 1;
  transform: rotate(-9deg);

  @media screen and (max-width: 420px) {
    width: 70%;
    margin-top: 110px;
  }
`;

const Login = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isJoinOpened, setIsJoinOpened] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    return await signInWithEmailAndPassword(auth, id, pw)
      .then((userCredential) => {
        // const user = userCredential.user;
        // console.log(user);
        setIsLoggedIn(true);
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            // console.log(idToken);
          })
          .catch((e) => {
            alert(e);
          });
      })
      .catch((e) => {
        alert(e);
      });
  };

  const openJoin = () => {
    setIsJoinOpened(true);
  };

  const closeJoin = () => {
    setIsJoinOpened(false);
  };

  const onGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        setIsLoggedIn(true);
      })
      .catch((e) => console.log(e));
  };
  const onGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GithubAuthProvider.credentialFromResult(result);
        setIsLoggedIn(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <StyledLogin className="Login">
      <form className="login-form" onSubmit={onSubmit}>
        <label className="idL label">ID</label>
        <input
          className="idI input-box"
          onChange={(e) => setId(e.target.value)}
        ></input>
        <label className="passwordL label">Password</label>
        <input
          className="passwordI input-box"
          type="password"
          onChange={(e) => setPw(e.target.value)}
        ></input>
        <button className="login-button">Login</button>
        <span className="join" onClick={openJoin}>
          join
        </span>
      </form>
      <Shadow1 className="Login-shadow"></Shadow1>
      <Shadow2 className="Login-shadow"></Shadow2>
      <LoginIcon
        onClick={onGoogle}
        src={googleIcon}
        alt="google"
        marginTop="50"
      />
      <LoginIcon
        onClick={onGithub}
        src={githubIcon}
        alt="github"
        marginTop="10"
      />
      <Modal open={isJoinOpened} close={closeJoin} header="Join and Plan!">
        <Join />
      </Modal>
    </StyledLogin>
  );
};

export default Login;
