const mongoose = require("mongoose");
const express = require("express");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = new mongoose.model("admin", adminSchema);

module.exports = Admin;
