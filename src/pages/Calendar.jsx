import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiWorks, ApiHoliday, ApiBirthday } from "settings/Api";
import * as GetRoute from "utils/GetRoute";
import * as GetMenu from "utils/GetMenu";
import * as GetUtils from "utils/GetUtils";
import * as Loading from "components/Loading";

// fullcalendar
import FullCalendar from "@fullcalendar/react";
import koLocale from "@fullcalendar/core/locales/ko";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Page() {
  const routeOrigin = GetRoute.RouteOrigin();
  const [dataEvents, setDataEvents] = useState([]);
  const [dataHoliday, setDataHoliday] = useState([]);
  const [dataBirthday, setDataBirthday] = useState([]);
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);

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
          resultBody.map((item) => {
            const itemTitle = item[0] ? item[0].v : "미정";
            const itemDescription = item[3] ? item[3].v : "미정";
            const itemColor = item[8].v !== null ? item[8].v : "gray";
            return resultEvents.push(
              {
                title: itemTitle,
                description: itemDescription,
                status: "시작",
                date: item[5] && item[5].f,
                backgroundColor: itemColor,
                borderColor: itemColor,
              },
              {
                title: itemTitle,
                description: itemDescription,
                status: "종료",
                date: item[6] && item[6].f,
                backgroundColor: itemColor,
                borderColor: itemColor,
              },
              {
                title: itemTitle,
                description: itemDescription,
                status: "라이브",
                date: item[7] && item[7].f,
                backgroundColor: itemColor,
                borderColor: itemColor,
              }
            );
          });
          setDataEvents(resultEvents);
        })
        .then(() => {
          setIsLoading1(false);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  useEffect(() => {
    const getHoliday = async () => {
      await axios
        .get(ApiHoliday)
        .then((response) => {
          const responseData = response.data;
          var from = responseData.indexOf("{");
          var to = responseData.lastIndexOf("}") + 1;
          var jsonText = responseData.slice(from, to);
          const result = GetUtils.GetParse("json", jsonText);
          const resultBody = [];
          result.table.rows.map((item) => resultBody.push(item.c));
          const resultEvents = [];
          resultBody.map((item) => {
            const itemTitle = item[0] ? item[0].v : "홍길동";
            const itemDescription = item[1] ? item[1].v : "홍길동";
            const itemReason = item[4] ? item[4].v : "휴가";
            const time = item[2].f === item[3].f ? "" : "T23:59:59";
            return resultEvents.push({
              title: "🏝" + itemTitle,
              description: itemDescription,
              status: itemReason,
              start: item[2] && item[2].f,
              end: item[3] && item[3].f + time,
              backgroundColor: "transparent",
              borderColor: "#cccccc",
              textColor: "#000000",
              classNames: "holiday",
            });
          });
          setDataHoliday(resultEvents);
        })
        .then(() => {
          setIsLoading2(false);
        })
        .catch((error) => console.log(error));
    };
    getHoliday();
  }, []);

  useEffect(() => {
    const getBirthday = async () => {
      await axios
        .get(ApiBirthday)
        .then((response) => {
          const responseData = response.data;
          var from = responseData.indexOf("{");
          var to = responseData.lastIndexOf("}") + 1;
          var jsonText = responseData.slice(from, to);
          const result = GetUtils.GetParse("json", jsonText);
          const resultBody = [];
          result.table.rows.map((item) => resultBody.push(item.c));
          const resultEvents = [];
          const currentYear = new Date().getFullYear();
          resultBody.map((item) => {
            const itemTitle = item[0] ? item[0].v : "홍길동";
            return resultEvents.push({
              title: "🎂" + itemTitle,
              description: "생일축하합니다!",
              status: "생일",
              date: currentYear + "-" + (item[1] && item[1].f),
              backgroundColor: "transparent",
              borderColor: "#cccccc",
              textColor: "#000000",
              classNames: "birthday",
            });
          });
          setDataBirthday(resultEvents);
        })
        .then(() => {
          setIsLoading2(false);
        })
        .catch((error) => console.log(error));
    };
    getBirthday();
  }, []);

  const renderEventContent = (eventInfo) => {
    const status = eventInfo.event.extendedProps.status;
    return (
      <div>
        <strong>[{eventInfo.event.title}]</strong>
        <br />
        <small> @{eventInfo.event.extendedProps.description} </small>
        <i><small>{status === "생일" ? '' : `#${status}`}</small></i>
      </div>
    );
  };
  return (
    <React.Fragment>
      <section className="main__secion section__calendar">
        <h2 className="main__title">{GetMenu.MenuLabel(routeOrigin)}</h2>
        {!isLoading1 && !isLoading2 ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            initialView="dayGridMonth"
            contentHeight={"auto"}
            selectable={true}
            eventContent={renderEventContent}
            locale={koLocale}
            events={[...dataEvents, ...dataHoliday, ...dataBirthday]}
          />
        ) : (
          <Loading.CTLoadingDiv />
        )}
      </section>
    </React.Fragment>
  );
}
