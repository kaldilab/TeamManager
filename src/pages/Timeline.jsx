import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiWorks } from "settings/Api";
import * as GetRoute from "utils/GetRoute";
import * as GetMenu from "utils/GetMenu";
import * as GetUtils from "utils/GetUtils";
import * as Loading from "components/Loading";

// fullcalendar
import FullCalendar from "@fullcalendar/react";
import koLocale from "@fullcalendar/core/locales/ko";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";

export default function Page() {
  const routeOrigin = GetRoute.RouteOrigin();
  const [dataResources, setDataResources] = useState([]);
  const [dataEvents, setDataEvents] = useState([]);
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
          const resultEvents = [];
          const resultResources = [];
          resultBody.map((item, index) => {
            const itemTitle = item[0] ? item[0].v : "미정";
            const itemDescription = item[3] ? item[3].v : "미정";
            const itemColor = 'rgba(167,161,141,0.7)';
            return (
              resultResources.push(
                {
                  id: 'project' + index,
                  title: itemTitle,
                },
              ),
              resultEvents.push(
                {
                  resourceId: 'project' + index,
                  title: itemTitle + ' (' + itemDescription + ')',
                  start: item[5] && item[5].f,
                  end: item[6] && item[6].f,
                  backgroundColor: itemColor,
                  borderColor: itemColor,
                },
              )
            );
          });
          setDataResources(resultResources);
          setDataEvents(resultEvents);
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
      <section className="main__secion section__timeline">
        <h2 className="main__title">{GetMenu.MenuLabel(routeOrigin)}</h2>
        {isLoading ? (
          <Loading.CTLoadingDiv />
        ) : (
          <FullCalendar
            schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
            plugins={[resourceTimelinePlugin, interactionPlugin]}
            initialView="resourceTimelineYear"
            contentHeight={"auto"}
            selectable={true}
            locale={koLocale}
            events={dataEvents}
            resources={dataResources}
          />
        )}
      </section>
    </React.Fragment>
  );
}
