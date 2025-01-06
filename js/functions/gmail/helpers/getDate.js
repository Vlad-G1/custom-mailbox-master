import {month} from "./monthsCurrentFormat.js";
import timeFormatter from "./timeFormatter.js";

function getDate(date) {
    const formattedDate = timeFormatter.format(new Date(date));
    const time = formattedDate.split(' ');
    return `${time[4].split(':').slice(0, 2).join(':')}, ${time[2].slice(0, -1)+' '+month[time[1]]}`;
}

export default getDate;