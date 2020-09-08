import React, { useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const StyledInput = styled(TextareaAutosize)`
  min-width: 2em;
  max-width: calc(100% - 8px);
  letter-spacing: 0.1em;
  border: none;
  background: transparent;
  display: block;
  font-size: 2rem;
  margin-bottom: 5vh;
  font-weight: bolder;
  resize: none;

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
      placeholder="Nazwij ankietę"
    />
  );
};

export default Name;
