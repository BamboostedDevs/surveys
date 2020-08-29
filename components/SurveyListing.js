import React from "react";
import styled from "styled-components";
import Link from "next/link";

function SurveyListing({ val, idx, theme }) {
  return (
    <Link key={idx} href={{ pathname: "/survey", query: { hash: val.title } }}>
      <_SurveyListing theme={theme}>
        <div>{val.title}</div>
        <div>Description: </div>
        <div>{val.description}</div>
      </_SurveyListing>
    </Link>
  );
}

const _SurveyListing = styled.div`
  --themed-rgba: ${({ theme }) =>
    theme === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)"};
  --themed-bw: ${({ theme }) => (theme === "dark" ? "white" : "black")};

  transition: all 0.25s ease;
  color: var(--themed-rgba);
  border-left: solid 1px var(--themed-rgba);
  border-right: solid 1px var(--themed-rgba);
  padding: 0 8px 0 8px;
  margin-bottom: 24px;
  cursor: pointer;

  > :nth-child(1) {
    margin-bottom: 8px;
    font-size: 1.3em;
    font-weight: 600;
  }

  > :nth-child(3) {
    margin-left: 8px;
    color: rgba(127, 127, 127, 0.8);
  }

  :hover {
    color: var(--themed-bw);
    border-left: solid 1px var(--themed-bw);
    border-right: solid 1px var(--themed-bw);
  }
`;

export default SurveyListing;
