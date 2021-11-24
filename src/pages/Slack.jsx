import React, { useState } from "react";
import axios from "axios";
import { ApiSlack } from "settings/Api";
import * as GetRoute from "utils/GetRoute";
import * as GetMenu from "utils/GetMenu";
import Food from "data/Food";

export default function Page() {
  const routeOrigin = GetRoute.RouteOrigin();
  const securityCode = "12345";
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() +
    ":" +
    ((today.getMinutes() < 10 ? "0" : "") + today.getMinutes()) +
    ":" +
    ((today.getSeconds() < 10 ? "0" : "") + today.getSeconds());
  const dateTime = date + " " + time;
  const [security, setSecurity] = useState("");
  const [message, setMessage] = useState("");

  const handleSecurityChange = (event) => {
    const { value } = event.target;
    setSecurity(value);
  };
  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    if (security === securityCode) {
      if (message) {
        if (window.confirm("정말로 메시지를 보낼 거야?")) {
          await axios
            .post(
              ApiSlack,
              {
                blocks: [
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: `📬 *[_${dateTime}_]*\n${message}`,
                    },
                  },
                ],
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((response) => {
              alert("메시지 날려보냈어!");
            })
            .then(() => {
              window.location.reload();
            })
            .catch((error) => console.log(error));
        } else {
          return false;
        }
      } else {
        alert("메시지를 입력하라니까!");
      }
    } else {
      alert("보안코드를 정확히 입력하라구!");
    }
  };
  const sendMenu = async (event) => {
    event.preventDefault();
    if (security === securityCode) {
      if (window.confirm("정말로 메뉴를 추천하려고?")) {
        await axios
          .post(
            ApiSlack,
            {
              blocks: [
                {
                  type: "section",
                  text: {
                    type: "mrkdwn",
                    text: `🍱 *[_${dateTime}_]*\n추천메뉴 : *${
                      Food[Math.floor(Math.random() * Food.length)]
                    }*, *${Food[Math.floor(Math.random() * Food.length)]}*, *${
                      Food[Math.floor(Math.random() * Food.length)]
                    }*!`,
                  },
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((response) => {
            alert("메뉴 추천했어!");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => console.log(error));
      } else {
        return false;
      }
    } else {
      alert("보안코드 좀 정확히 입력해!");
    }
  };

  return (
    <React.Fragment>
      <section className="main__section section__slack">
        <h2 className="main__title">{GetMenu.MenuLabel(routeOrigin)}</h2>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            {/* 보안코드 */}
            <div className="form-group">
              <label htmlFor="securityCode" className="d-block text-center">
                🔐 <strong>보안코드</strong>
              </label>
              <input
                type="password"
                className="form-control"
                id="securityCode"
                onChange={handleSecurityChange}
                value={security}
                placeholder="보안코드를 입력하세요."
              />
              <small className="form-text text-muted">
                보안코드를 입력해야 슬랙에 정보를 전송할 수 있어요.
              </small>
            </div>
            {/* //보안코드 */}
            {/* 메시지 */}
            <h3 className="h5 mt-5 py-2">📬 슬랙에 메시지를 날려보세요!</h3>
            <form onSubmit={sendMessage}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="formMessage"
                  rows="3"
                  maxLength="100"
                  onChange={handleMessageChange}
                  value={message}
                  placeholder="100자 이하의 메시지를 입력하세요."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-secondary btn-block">
                메시지 날리기
              </button>
              <small className="form-text text-muted">
                슬랙 <strong>#팀-일반</strong> 채널에 메시지가 보내져요.
              </small>
            </form>
            {/* //메시지 */}
            {/* 점심메뉴 */}
            <h3 className="h5 mt-5 py-2">🍱 슬랙에 점심메뉴를 추천해보세요!</h3>
            <form onSubmit={sendMenu}>
              <button
                type="submit"
                className="btn btn-secondary btn-block btn-lg"
              >
                점심메뉴 추천하기
              </button>
              <small className="form-text text-muted">
                슬랙 <strong>#팀-일반</strong> 채널에 점심메뉴 3개를 추천해줘요.
              </small>
            </form>
            {/* //점심메뉴 */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
