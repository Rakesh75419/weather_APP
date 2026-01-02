const http = require("http");
const fs = require("fs");
const requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, data) => {

  const weather = data.weather[0].main;
  const iconCode = data.weather[0].icon; 
  const isDay = iconCode.includes("d");

  let weatherIcon = "";

  //  CLEAR
  if (weather === "Clear") {
    weatherIcon = isDay
      ? `<i class="fas fa-sun" style="color:#f39c12"></i>`
      : `<i class="fas fa-moon" style="color:#f1c40f"></i>`;
  }

  //  CLOUDS
  else if (weather === "Clouds") {
    weatherIcon = `<i class="fas fa-cloud" style="color:#dfe6e9"></i>`;
  }

  // RAIN
  else if (weather === "Rain") {
    weatherIcon = `<i class="fas fa-cloud-showers-heavy" style="color:#74b9ff"></i>`;
  }

  //  HAZE / MIST
  else if (weather === "Haze" || weather === "Mist") {
    weatherIcon = `<i class="fas fa-smog" style="color:#b2bec3"></i>`;
  }

  //  DEFAULT NIGHT
  else {
    weatherIcon = isDay
      ? `<i class="fas fa-cloud-sun" style="color:#f1c40f"></i>`
      : `<i class="fas fa-cloud-moon" style="color:#f1c40f"></i>`;
  }

  let output = tempVal.replace(/{%tempval%}/g, data.main.temp);
  output = output.replace(/{%tempmin%}/g, data.main.temp_min);
  output = output.replace(/{%tempmax%}/g, data.main.temp_max);
  output = output.replace(/{%location%}/g, data.name);
  output = output.replace(/{%country%}/g, data.sys.country);
  output = output.replace(/{%weathericon%}/g, weatherIcon);

  return output;
};

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    let body = "";

    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=Noida&units=metric&appid=81c8e2a53f60f78c8beda5f2317a42d9"
    )
      .on("data", chunk => body += chunk)
      .on("end", () => {
        const obj = JSON.parse(body);
        const html = replaceVal(homeFile, obj);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
  }

  else if (req.url === "/style.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(fs.readFileSync("style.css"));
  }

  else if (req.url === "/script.js") {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.end(fs.readFileSync("script.js"));
  }

  else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server running at http://127.0.0.1:8000");
});
