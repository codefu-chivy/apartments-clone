const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/html/index.html");
});

app.get("/is-secure", (req, res) => {
    let protocol = req.protocol;
    console.log(protocol)
    let secure;
    let data;
    if (protocol === "https") {
        secure = true;
    }
    else {
        secure: false;
    }
    data = {
        secure: secure
    };
    res.json(data);
})

app.listen(port, () => {
    console.log("Listening on " + port);
})
