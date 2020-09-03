import styled from "styled-components";

const Scroll = styled.div`
  max-height: ${({ size }) => size || "65vh"};
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  margin-right: -16px;

  margin-bottom: 24px;
`;

export default Scroll;
