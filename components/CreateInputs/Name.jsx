import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  min-width: 2em;
  letter-spacing: 0.1em;
  border: none;
  background: transparent;
  display: block;
  font-size: 2rem;
  margin-bottom: 5vh;
  font-weight: bolder;
  word-wrap: break-word;
  word-break: break-all;

  &:focus {
    outline: none;
  }
`;

const Name = ({ survey, update }) => {
  const updateName = (event) => {
    event.persist();
    const value = event.target.value;
    var _survey = { ...survey };
    _survey.title = value;
    update(_survey);
  };
  return (
    <StyledInput
      value={survey.title || ""}
      onChange={updateName}
      placeholder="No Name"
    />
  );
};

export default Name;
