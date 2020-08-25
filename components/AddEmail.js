import React, { useState, useEffect } from "react";
import { Button, Input } from "rsuite";
import { validateEmail } from "../utils";

export default function AddEmail({ email, setEmail }) {
  return (
    <div>
      <h3 style={{ marginBottom: "16px" }}>Provide an email</h3>
      <div
        style={{
          textAlign: "center",
          marginTop: "7.5vh",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
        }}
      >
        <h5>
          {validateEmail(email)
            ? "Email is here!"
            : "You have to provide an email address in order to post the results!"}
        </h5>
        <Input
          size="md"
          value={email}
          placeholder={"Email"}
          onChange={setEmail}
          style={{
            marginTop: "5vh",
            width: "50%",
            minWidth: "200px",
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
}
