import styled from "styled-components";

const Scroll = styled.div`
  max-height: ${({ size }) => size || "65vh"};
  overflow-y: auto;
  padding-right: 8px;

  margin-bottom: 24px;
  ::-webkit-scrollbar {
    width: 1px;
  }
`;

export default Scroll;
