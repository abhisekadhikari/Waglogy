const express = require("express")
const route = express.Router()
const Contact = require("../Model/Schema")

route.get("/", (req, res) => {
  res.render("index")
})

route.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message)
      return res.status(401).json({ message: "Fill All The Fields" })
    const contactData = new Contact({ name, email, subject, message })
    await contactData.save()
    res.redirect("/thankyou")
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

route.get("/thankyou", (req, res) => {
  res.render("successful")
})

module.exports = route
