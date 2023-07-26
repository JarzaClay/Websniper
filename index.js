const express = require("express");
const https = require("https");
const app = express();
const httpPort = 80;
const httpsPort = 445;
const httpsOptions = {
    key: process.env['PRIVATE_KEY'],
    cert: process.env['CERTIFICATE'],
};
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use((req, res, next) => {
    const request = `${req.headers["x-forwarded-for"] || req.socket.remoteAddress} requested ${req.originalUrl} using ${req.method}`;
    console.log(request);
    next();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(httpPort, () => {
    console.log(`HTTP server started on port ${httpPort}`);
});

https.createServer(httpsOptions, app).listen(httpsPort, () => {
    console.log(`HTPPS server started on port ${httpsPort}`);
});
