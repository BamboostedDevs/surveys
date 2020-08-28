import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import React from "react";

function _Nav({ className, page, login }) {
  const logout = () => console.log(logout);
  const handleClick = () => {
    if (login) {
    } else router.push("/login");
  };
  const router = useRouter();

  return (
    <div className={className}>
      <Link href={router.pathname !== "/" ? "/" : "/create"}>
        <span>{router.pathname !== "/" ? "home" : "create"}</span>
      </Link>
      <span>&zwnj;</span>
      <span onClick={handleClick}>{login ? "logout" : "login"}</span>
    </div>
  );
}

const Nav = styled(_Nav)`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  margin: 16px 0 0 24px;
  font-size: 1.5em;
  z-index: 999;

  > :nth-child(1),
  > :nth-child(3) {
    cursor: pointer;
  }

  > :nth-child(2) {
    width: 1px;
    background-color: rgb(127, 127, 127, 0.5);
    margin: 0 8px 0 8px;
  }
`;

export default Nav;
