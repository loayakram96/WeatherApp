import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = (props) => {
  const { title, icon, event } = props;

  return (
    <Button onClick={event}>
      {title}
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

export default IconButton;

const Button = styled.button`
  padding: 11px;
  font-size: 18px;
  border-radius: 24px;
  border: gray solid 2px;
  outline: none;
  color: white;
  background-color: rgb(61 145 205);
  cursor: pointer;
  width: 320px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  margin-top: 8px;
`;
