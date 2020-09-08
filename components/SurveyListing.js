import React from "react";
import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
import Axios from "axios";
import { Alert } from "rsuite";
var fileDownload = require("js-file-download");

function SurveyListing({ val, idx, theme, sent, appContext }) {
  const handleClick = async () => {
    appContext.role === 1 &&
      (await Axios.get(
        "http://7a55f9bc1d92.ngrok.io/surveys/answered-csv/" + val.id,
        {
          headers: { authorization: appContext.session },
        }
      )
        .then((resp) => {
          if (resp.data) {
            fileDownload(resp.data, (val.title || "survey") + ".csv");
          }
        })
        .catch((e) => {
          Alert.error("Błąd");
        }));
  };

  return (
    <div onClick={handleClick}>
      <Link
        key={idx}
        href={
          appContext.role !== 1
            ? { pathname: "/survey", query: { hash: val.title } }
            : ""
        }
      >
        <_SurveyListing theme={theme}>
          <div>
            <div className="title">{val.title}</div>
            <div>Opis: </div>
            <div className="dimm">{val.description}</div>
          </div>
          {sent && (
            <div>
              <div className="title">wysłano</div>
              <div className="dimm">
                {moment(sent * 1000)
                  .locale("pl")
                  .fromNow()}
              </div>
            </div>
          )}
        </_SurveyListing>
      </Link>
    </div>
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

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  .title {
    margin-bottom: 8px;
    font-size: 1.3em;
    font-weight: 600;
  }

  .dimm {
    margin-left: 8px;
    color: rgba(127, 127, 127, 0.8);
  }

  > :nth-child(1) {
    max-width: 65%;
  }

  > :nth-child(2) {
    text-align: right;
  }

  :hover {
    color: var(--themed-bw);
    border-left: solid 1px var(--themed-bw);
    border-right: solid 1px var(--themed-bw);
  }
`;

export default SurveyListing;
