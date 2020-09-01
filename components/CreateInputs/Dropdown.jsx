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

export default function Dropdown({ date, children, remove, input }) {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = (e) => {
    e.preventDefault();

    console.log(e.target);
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
        <div onClick={() => !date && setDropdown(true)}>{input}</div>
        <span>
          {!date && (
            <Icon
              onClick={toggleDropdown}
              style={{ marginRight: "16px", cursor: "pointer" }}
              icon={dropdown ? "angle-up" : "edit"}
            />
          )}
          <Icon
            onClick={remove}
            style={{ marginRight: "4px", cursor: "pointer" }}
            icon={"trash-o"}
          />
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
        </>
      )}
    </>
  );
}
