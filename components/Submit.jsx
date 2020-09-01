import styled from "styled-components";
import { Icon } from "rsuite";

const _Submit = ({ next, previous, className, children, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {previous && (
        <div style={{ marginRight: "8px" }}>
          <Icon icon="angle-left" />
        </div>
      )}
      <div>{children}</div>
      {next && (
        <div style={{ marginLeft: "8px" }}>
          <Icon icon="angle-right" />
        </div>
      )}
    </div>
  );
};

const Submit = styled(_Submit)`
  position: fixed;
  z-index: 999;
  ${({ previous }) => (previous ? "left: 32px;" : "right: 32px;")}
  bottom: 32px;
  height: 7.5vh;
  width: 15vh;
  border-radius: 16px;
  border-style: solid;
  border-width: 1px;
  border-color: #666666;
  text-align: center;
  line-height: 7.5vh;
  transition: color 0.25s, background-color 0.5s;
  cursor: pointer;
  display: flex;
  justify-content: center;

  user-select: none;

  :hover {
    border-color: #1675e0;
    color: #1675e0;
  }

  :active {
    border-color: #666666;
    color: #666666;
  }
`;

export default Submit;
