import React, { useState } from "react";
import { ControlLabel, Icon } from "rsuite";
import styled from "styled-components";

const Settings = styled.div`
  padding: 8px 8px 8px 8px;
  margin: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
  border-left: 1px solid #575757;

  > * {
    width: 47.5%;
  }
`;

export default function Dropdown({ question, children, name, remove }) {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <>
      <ControlLabel
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span
          onClick={toggleDropdown}
          style={{
            cursor: "text",
          }}
        >
          {!dropdown &&
            (name ? (
              <h2 style={{ marginBottom: "5vh" }}>{question || "No name"}</h2>
            ) : (
              question || "Question missing"
            ))}
        </span>
        <span
          style={{
            cursor: "pointer",
          }}
        >
          <Icon
            onClick={toggleDropdown}
            style={{ marginRight: name ? "4px" : "16px" }}
            icon={dropdown ? "angle-up" : "edit"}
          />
          {!name && (
            <Icon
              onClick={remove}
              style={{ marginRight: "4px" }}
              icon={"trash-o"}
            />
          )}
        </span>
      </ControlLabel>
      {dropdown && (
        <>
          <Settings
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                setDropdown(false);
                ev.preventDefault();
              }
            }}
          >
            {children}
          </Settings>
          <ControlLabel>
            {name ? (
              <h2 style={{ marginBottom: "1vh" }}>{question || "No name"}</h2>
            ) : (
              question || "Question missing"
            )}
          </ControlLabel>
        </>
      )}
    </>
  );
}
