const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();
const textToImage = require("text-to-image");

require('dotenv').config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.post("/download", async (req, res) => {
  await textToImage.generate(req.body.quote, {
    debug: true,
    debugFilename: "./downloads/quote.png",
    maxWidth: 1000,
    customHeight: 500,
    fontSize: 75,
    lineHeight: 100,
    fontFamily: "Lato",
    fontPath: "./Lato-BoldItalic.ttf",
    bgColor: "black",
    textColor: req.body.colorString,
    textAlign: "center",
    verticalAlign: "center",
  });
  res.download("./downloads/quote.png");
});

app.use("/api", router);

app.listen(4000, () => console.log("SERVER STARTED"));
