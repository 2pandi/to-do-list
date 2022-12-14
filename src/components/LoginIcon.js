import styled from "styled-components";

const StyledDiv = styled.div`
  width: 380px;
  max-width: 390px;
  height: 50px;
  margin-top: ${(props) => props.marginTop}px;
  background-color: #faf7ff;
  border: 0.3px solid lightgray;
  border-radius: 15px;
  display: flex;
  align-items: center;
  :hover {
    filter: contrast(0.9);
    cursor: pointer;
  }

  @media screen and (max-width: 420px) {
    width: 90%;
  }

  img {
    width: 35px;
    margin: 0 20px;
  }
`;

const LoginIcon = ({ onClick, src, alt, marginTop }) => {
  return (
    <>
      <StyledDiv className="LoginIcon" onClick={onClick} marginTop={marginTop}>
        <img src={src} alt={alt} />
        Sign in with {alt}
      </StyledDiv>
    </>
  );
};

export default LoginIcon;
