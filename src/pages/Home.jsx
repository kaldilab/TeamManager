import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiWorks } from "settings/Api";
import * as GetUtils from "utils/GetUtils";
import * as Loading from "components/Loading";
import * as ListGroup from "components/ListGroup";

export default function Page() {
  const [dataBody, setDataBody] = useState([]);
  const [dataMemeber, setDataMemeber] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(ApiWorks)
        .then((response) => {
          const responseData = response.data;
          var from = responseData.indexOf("{");
          var to = responseData.lastIndexOf("}") + 1;
          var jsonText = responseData.slice(from, to);
          const result = GetUtils.GetParse("json", jsonText);
          const resultBody = [];
          result.table.rows.map((item) => resultBody.push(item.c));
          const resultMember = [];
          resultBody.map((item) => resultMember.push(item[3] && item[3].v));
          const singleMember = resultMember.filter(
            (item, index) =>
              item.match(",") === null && resultMember.indexOf(item) === index
          );
          const multiMember = resultMember
            .map((item) => item.match(",") && item)
            .filter((item, index) => resultMember.indexOf(item) === index);
          const multiMemberFlat = multiMember
            .map((item) => item.split(","))
            .flat();
          const allMember = [...multiMemberFlat, ...singleMember];
          const allMemberSet = new Set(allMember);
          const allMemberFilter = [...allMemberSet];
          setDataBody(resultBody);
          setDataMemeber(allMemberFilter);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);
  return (
    <React.Fragment>
      <section className="main__section section__member">
        <h2 className="main__title">
          Member <small>({dataMemeber.length}???)</small>
        </h2>
        <h6 className="text-muted mb-3">
          ???????????? ?????? ???????????? ?????????????????????.
        </h6>
        <div className="mb-3 text-right">
          <span className="badge badge-success">
            ??????[80%]<small>(PL[100%])</small>
          </span>
          <span className="badge badge-warning">??????1[80%]</span>
          <span className="badge badge-warning">??????2[60%]</span>
          <span className="badge badge-info">??????1[40%]</span>
          <span className="badge badge-info">??????2[20%]</span>
        </div>
        {isLoading ? (
          <Loading.CTLoadingDiv />
        ) : (
          <div className="row">
            {dataMemeber.map((item, index) => {
              const manager = item === "?????????" ? "bg-light" : "";
              const position =
                item === "?????????1" || item === "?????????2"
                  ? "??????"
                  : item === "?????????3" || item === "?????????4" || item === "?????????5"
                  ? "??????"
                  : item === "?????????6" || item === "?????????7" || item === "?????????8"
                  ? "??????"
                  : "??????";
              const sumEnergy = [];
              return (
                <div className="col-md-4 mb-3" key={index}>
                  <div className={`card ${manager}`}>
                    <div className="card-body">
                      <h5 className="card-title">
                        {item}{" "}
                        <small className="text-secondary">{position}</small>
                      </h5>
                      <div className="card-text">
                        {dataBody.map((rowItem, rowIndex) => {
                          const sort = rowItem[2].v;
                          let sortColor = "";
                          const leader = rowItem[9].v;
                          let energy = 0;
                          if (sort === "??????") {
                            energy = 80;
                            sortColor = "success";
                            if (item === leader) {
                              energy = 100;
                            }
                          } else if (sort === "??????1") {
                            energy = 80;
                            sortColor = "warning";
                          } else if (sort === "??????2") {
                            energy = 60;
                            sortColor = "warning";
                          } else if (sort === "??????1") {
                            energy = 40;
                            sortColor = "info";
                          } else if (sort === "??????2") {
                            energy = 20;
                            sortColor = "info";
                          }
                          return (
                            rowItem[3].v.includes(item) && (
                              <span key={rowIndex}>
                                <strong>
                                  <small className={`badge badge-${sortColor}`}>
                                    {sort}
                                  </small>{" "}
                                  {rowItem[0].v}
                                </strong>
                                <i>{energy}%</i>
                              </span>
                            )
                          );
                        })}
                      </div>
                    </div>
                    <div className="card-footer bg-transparent">
                      {dataBody.map((rowItem) => {
                        const sort = rowItem[2].v;
                        const leader = rowItem[9].v;
                        let energy = 0;
                        if (sort === "??????") {
                          energy = 80;
                          if (item === leader) {
                            energy = 100;
                          }
                        } else if (sort === "??????1") {
                          energy = 80;
                        } else if (sort === "??????2") {
                          energy = 60;
                        } else if (sort === "??????1") {
                          energy = 40;
                        } else if (sort === "??????2") {
                          energy = 20;
                        }
                        if (rowItem[3].v.includes(item)) {
                          sumEnergy.push(energy);
                        }
                        return false;
                      })}
                      {
                        <span className="energy-bar">
                          <strong
                            style={{
                              width: `${
                                sumEnergy.reduce((a, b) => a + b, 0) / 2
                              }%`,
                            }}
                          >
                            <small>
                              {sumEnergy.reduce((a, b) => a + b, 0)}%
                            </small>
                          </strong>
                        </span>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      <section className="main__section section__info">
        <h2 className="main__title">Link</h2>
        <ListGroup.CTListGroup>
          <li className="list-group-item">
            <strong>Gitlab Group</strong> :{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              gitlab.com
            </a>
          </li>
          <li className="list-group-item">
            <strong>Google Sheets</strong> :{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              FE Team Works
            </a>
          </li>
          <li className="list-group-item">
            <strong>Google Sheets</strong> :{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              FE Team Holiday
            </a>
          </li>
          <li className="list-group-item">
            <strong>Guide</strong> :{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              FE Team Guide
            </a>
          </li>
        </ListGroup.CTListGroup>
      </section>
    </React.Fragment>
  );
}
