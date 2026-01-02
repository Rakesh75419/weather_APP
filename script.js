const curDate = document.getElementById("date");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let period = hours >= 12 ? "PM" : "AM";

if (hours > 12) hours -= 12;
if (hours === 0) hours = 12;
if (minutes < 10) minutes = "0" + minutes;

curDate.innerHTML =
  `${days[now.getDay()]} | ${months[now.getMonth()]} ${now.getDate()} | ${hours}:${minutes} ${period}`;
