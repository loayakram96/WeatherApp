import React from "react";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
const Error = (props) => {
  const { setApierror, BackClick } = props;
  return (
    <Container>
      <Message>City not found! Please try again</Message>
    </Container>
  );
};

export default Error;

const Container = styled.div``;
const Message = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const Back = styled.span`
  color: #193c57;
  font-size: 25px;
  cursor: pointer;
  margin-right: 90%;
`;
