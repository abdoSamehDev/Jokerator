// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const API_URL = "https://v2.jokeapi.dev/joke";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

var flags = [];

function getKeyByValue(object) {
  for (const key in object) {
    if (object[key] === true) {
      flags.push(key);
    }
  }
}

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      API_URL + "/any?blacklistFlags=religious,racist"
    );
    flags = [];
    getKeyByValue(result.data.flags);
    console.log(flags);
    const data = {
      setup: result.data.setup,
      delivery: result.data.delivery,
      flags: flags,
    };
    console.log(data);
    res.render("index.ejs", data);
  } catch (error) {
    res.render("index.ejs", { error: error.message });
    // res.status(500);
  }
});

app.post("/add", (req, res) => {
  const todoTitle = req.body.todoTitle;
  if (!todoTitle == "") {
    if (!req.headers.referer.includes("/work")) {
      if (!todayTodoList.includes(todoTitle)) {
        todayTodoList.push(todoTitle);
        res.redirect(req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    } else {
      if (!workTodoList.includes(todoTitle)) {
        workTodoList.push(todoTitle);
        res.redirect(req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    }
  } else {
    res.redirect(req.headers.referer);
  }
});

app.get("/work", (req, res) => {
  const data = {
    tasks: workTodoList,
  };
  console.log("Work: " + workTodoList);
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

var todayTodoList = [];
var workTodoList = [];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
