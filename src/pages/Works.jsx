import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiWorks } from "settings/Api";
import * as GetRoute from "utils/GetRoute";
import * as GetMenu from "utils/GetMenu";
import * as GetUtils from "utils/GetUtils";
import * as Loading from "components/Loading";
import * as BoardTable from "components/BoardTable";

export default function Page() {
  const routeOrigin = GetRoute.RouteOrigin();
  const [dataHead, setDataHead] = useState([]);
  const [dataBody, setDataBody] = useState([]);
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
          const resultHead = result.table.cols;
          const resultBody = [];
          result.table.rows.map((item) => resultBody.push(item.c));
          setDataHead(resultHead);
          setDataBody(resultBody);
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
      <section className="main__section section__works">
        <h2 className="main__title">{GetMenu.MenuLabel(routeOrigin)}</h2>
        <div className="table-responsive-md">
          {isLoading ? (
            <Loading.CTLoadingDiv />
          ) : (
            <BoardTable.CTBoardTable tableClass="table-striped table-hover">
              <thead className="table-thead thead-dark">
                <tr>
                  <th>번호</th>
                  {dataHead.map(
                    (item, index) =>
                      index !== 8 && <th key={index}>{item.label}</th>
                  )}
                </tr>
              </thead>
              <tbody className="table-tbody">
                {dataBody.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {item.map(
                      (itemRow, itemIndex) =>
                        itemIndex !== 8 &&
                        (itemRow === null || itemRow.v === null ? (
                          <td key={itemIndex}>-</td>
                        ) : (
                          <td key={itemIndex}>
                            {itemRow.f ? itemRow.f : itemRow.v}
                          </td>
                        ))
                    )}
                  </tr>
                ))}
              </tbody>
            </BoardTable.CTBoardTable>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
