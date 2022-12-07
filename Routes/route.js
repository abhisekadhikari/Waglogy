const express = require("express");
const route = express.Router();
const Contact = require("../Model/Schema");
const Feedback = require("../Model/Feedback");
const { check, validationResult } = require("express-validator");

route.get("/", async (req, res) => {
  const data = await Feedback.find({}).lean();
  //   res.json(data);
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
    // if (!name || !number || !email || !message) {
    //   return res.status(500).json({
    //     Error: "Fill all The Fields",
    //   });
    // } else {
    //   const data = new Contact({ name, email, number, message });
    //   data.save();
    //   // res.redirect('/contact')
    //   res.status(200).json({
    //     message: "Send Successfully",
    //   });
    // }
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
    //   if (!name || !message) {
    //     return res.status(501).json({ message: "Error" });
    //   }
    //   const data = new Feedback({ name, message });
    //   data.save();
    //   res.status(200).redirect("/");

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

route.get("/admin", async (req, res) => {
  data = await Feedback.find({});
  contact = await Contact.find({}).lean();
  if (!data || !contact) {
    return res.status(404).json({
      message: "There Is No Feedbacks",
    });
  }
  res.render("feedback", {
    data,
    contact,
  });
});

module.exports = route;
