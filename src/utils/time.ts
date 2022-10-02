var relativeTime = require("dayjs/plugin/relativeTime");
require("dayjs/locale/ru");
var dayjs = require("dayjs");

dayjs.extend(relativeTime);

export const fromNowTimeFormat = (time: Date) => {
  return dayjs(time).locale("ru").fromNow();
};
