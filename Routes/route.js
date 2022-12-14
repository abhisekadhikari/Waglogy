const express = require("express");
const jwt = require("jsonwebtoken");
const route = express.Router();
const Contact = require("../Model/Schema");
const Feedback = require("../Model/Feedback");
const Admin = require("../Model/Admin");
const { check, validationResult } = require("express-validator");
const auth = require("./auth");

route.get("/", async (req, res) => {
  const data = await Feedback.find({}).lean();
  res.render("index", {
    data,
  });
});

route.get("/contact", (req, res) => {
  res.render("contact");
});

route.get("/services", (req, res) => {
  res.render("services");
});

route.get("/studentc", (req, res) => {
  res.render("studentc");
});

route.get("/about", (req, res) => {
  res.render("about");
});
route.get("/privicy", (req, res) => {
  res.render("privicy");
});
route.post(
  "/api/contact",
  [
    check("name", "Name Cannot Be Empty").exists().isLength({ min: 5 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("number", "Enter valid number").exists().isNumeric(),
    check("message", "Message cannot be empty").exists().isLength({ min: 5 }),
  ],
  (req, res) => {
    const { name, number, email, message } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const alert = result.array();
      return res.render("contact", {
        alert,
      });
    }
    const data = new Contact({ name, email, number, message });
    data.save();
    res.status(200).redirect("/contact");
  }
);

route.post(
  "/api/feedback",
  [
    check("name", "Name Cannot Be Empty").exists().isLength({ min: 5 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("message", "Mesage Cannot Be Empty").exists().isLength({ min: 5 }),
  ],
  (req, res) => {
    const { name, message, email } = req.body;

    const result = validationResult(req);
    if (!result.isEmpty()) {
      const alert = result.array();
      res.render("index", {
        alert,
      });
    } else {
      const data = new Feedback({ name, message, email });
      data.save();
      res.status(200).redirect("/");
    }
  }
);

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "Enter All The Filds" });
  }
  const data = await Admin.findOne({ email: email });
  try {
    if (!data) {
      return res.status(404).json({ message: "Craniantials Failed" });
    }
    if (data.password != password) {
      return res.status(404).json({ message: "Enter valid Cradentials" });
    }
    const ID = data._id.toString();
    const token = jwt.sign(ID, `${process.env.SECRET_KEY}`);
    res
      .cookie("jwt", token, {
        expires: new Date(Date.now() + 300000),
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .redirect("/admin");
  } catch (error) {
    console.log(error);
  }
});

route.get("/login", (req, res) => {
  res.render("login");
});

route.get("/admin", auth, async (req, res) => {
  const id = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY);
  const admin = await Admin.findOne({ _id: id });
  const feedbackData = await Feedback.find({}).lean();
  const contactData = await Contact.find({}).lean();
  const name = admin.name;
  res.render("admin", {
    name,
    feedbackData,
    contactData,
  });
});

route.get("*", (req, res) => {
  res.render("nopage");
});

module.exports = route;
