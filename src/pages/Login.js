import styled from "styled-components";

const Container = styled.form`
  width: 80%;
  max-width: 390px;
  height: 180px;
  margin-top: 50px;
  border-radius: 30px;
  background-color: #e2cbff;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  flex-direction: column;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 3;

  .input-box {
    border: none;
    border-bottom: 1px solid black;
    background-color: transparent;
    padding: 0 15px;
    margin: 10px 20px 0 20px;
    grid-column: 1/3;
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
    grid-column: 1/2;
    grid-row: 3/4;
  }
  .join {
    grid-column: 2/3;
    grid-row: 3/4;
    margin: 25px 0 0 20px;
  }
`;
const Shadow1 = styled.div`
  width: 70%;
  max-width: 350px;
  height: 150px;
  margin-top: 90px;
  border-radius: 30px;
  background-color: #cbdaff;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 2;
  transform: rotate(-4.5deg);
`;
const Shadow2 = styled.div`
  width: 60%;
  max-width: 300px;
  height: 120px;
  margin-top: 130px;
  border-radius: 30px;
  background-color: #fff9c6;
  grid-row: 1/2;
  grid-column: 1/2;
  z-index: 1;
  transform: rotate(-9deg);
`;

const Login = () => {
  const onSubmit = () => {};
  const onClickJoin = () => {};
  return (
    <>
      <Container onSubmit={onSubmit}>
        <input className="input-box"></input>
        <input className="input-box"></input>
        <button className="login-button">Login</button>
        <span className="join" onClick={onClickJoin}>
          join
        </span>
      </Container>
      <Shadow1></Shadow1>
      <Shadow2></Shadow2>
    </>
  );
};

export default Login;
