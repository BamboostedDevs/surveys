import React, { useEffect, useState } from "react";
import { Alert, AutoComplete, Tag, TagGroup, TreePicker } from "rsuite";
import styled from "styled-components";

const _Tag = styled.span`
  font-size: 1.1em;
`;

function _Equation({ className, equation, setEquation, count }) {
  const [value, setValue] = useState(false);

  const removeFromEquation = (idx) => {
    const newEquation = [...equation];
    newEquation.splice(idx, 1);
    setEquation(newEquation);
  };

  const handleInputConfirm = (value) => {
    value && setEquation([...equation, value]);
    setValue(false);
  };
  return (
    <div className={className}>
      <h5>Formuła:</h5>
      <TreePicker
        defaultExpandAll
        menuStyle={{ maxHeight: "37vh", overflowY: "auto" }}
        data={[
          { label: "Pola z ankiety", value: 0, children: count },
          {
            label: "Operacje",
            value: 1,
            children: [
              { label: "+", value: "+" },
              { label: "-", value: "-" },
              { label: "*", value: "*" },
              { label: "/", value: "/" },
              { label: "(", value: "(" },
              { label: ")", value: ")" },
            ],
          },
        ]}
        disabledItemValues={[0, 1]}
        style={{ width: "100%" }}
        onChange={handleInputConfirm}
        value={value}
        placeholder="Dodaj kafelek"
      />
      <TagGroup>
        {equation.length < 1 && (
          <Tag color="blue">
            <_Tag>Proszę wybrać kafelki</_Tag>
          </Tag>
        )}
        {equation.map((val, idx) => (
          <Tag
            key={idx}
            closable
            onClose={() => {
              removeFromEquation(idx);
            }}
          >
            <_Tag>{val}</_Tag>
          </Tag>
        ))}
      </TagGroup>
    </div>
  );
}

const Equation = styled(_Equation)`
  > :nth-child(3) {
    margin: 8px 0 0 0px;
    padding-bottom: 8px;
    border-bottom: dashed currentColor 1px;
  }
  > :nth-child(2) {
    margin-top: 24px;
  }
`;

export default Equation;
