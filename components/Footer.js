import Link from "next/link";
import React from "react";
import styled from "styled-components";

function _Footer({ className }) {
  return (
    <div className={className}>
      <img src="/flag.png" />
      <span>
        Projekt został współfinansowany ze środków unii europejskiej
        <br />
        <Link href="https://google.com">BABJCDB 12312</Link>
      </span>
    </div>
  );
}

const Footer = styled(_Footer)`
  position: absolute;
  height: 10vh;
  display: flex;
  bottom: 0;
  margin: 0 -32px 0 -32px;

  > :nth-child(n) {
    height: 90%;
    margin: 5% 0 5% 0;
  }

  > span {
    display: flex;
    flex-flow: column wrap;
    margin-left: 16px !important;
    width: 220px;
    max-width: 40vw;
    font-size: 0.9em;
  }

  > span > :nth-child(2) {
    line-height: 3em;
  }
`;

export default Footer;
