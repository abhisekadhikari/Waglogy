const express = require("express")
const jwt = require("jsonwebtoken")
const route = express.Router()
const Contact = require("../Model/Schema")
const Feedback = require("../Model/Feedback")
const Admin = require("../Model/Admin")
const { check, validationResult } = require("express-validator")

route.get("/", (req, res) => {
  res.render("index")
})

route.get("/about", (req, res) => {
  res.render("about")
})

route.get("/service", (req, res) => {
  res.render("service")
})

route.get("/contact", (req, res) => {
  res.render("contact")
})
route.get("/project", (req, res) => {
  res.render("project")
})

route.get("*", (req, res) => {
  res.render("404")
})

module.exports = route
