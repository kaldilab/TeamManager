const SHEET_ID_WORKS = "인증키";
const SHEET_ID_HOLIDAY = "인증키";
const SHEET_ID_BIRTHDAY = "인증키";

const ApiWorks = `https://docs.google.com/spreadsheets/d/${SHEET_ID_WORKS}/gviz/tq`;
const ApiHoliday = `https://docs.google.com/spreadsheets/d/${SHEET_ID_HOLIDAY}/gviz/tq`;
const ApiBirthday = `https://docs.google.com/spreadsheets/d/${SHEET_ID_BIRTHDAY}/gviz/tq`;
const ApiSlack = "https://hooks.slack.com/services/인증코드";

export { ApiWorks, ApiHoliday, ApiBirthday, ApiSlack };
