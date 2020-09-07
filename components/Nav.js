import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Alert } from "rsuite";

function _Nav({ className, session, setSession, role }) {
  const router = useRouter();

  useEffect(() => {
    console.log(role);
  }, [role]);

  const handleClick = () => {
    if (session) {
      setSession(false);
      Alert.info("Wylogowano");
      window.location.reload(false);
    } else router.push("/login");
  };

  return (
    <div className={className}>
      <Link href={router.pathname === "/" && role === 1 ? "/create" : "/"}>
        <span>{router.pathname === "/" && role === 1 ? "create" : "home"}</span>
      </Link>
      <span>&zwnj;</span>
      <span onClick={handleClick}>{session ? "logout" : "login"}</span>
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
    background-color: rgba(127, 127, 127, 0.5);
    margin: 0 8px 0 8px;
  }
`;

export default Nav;
