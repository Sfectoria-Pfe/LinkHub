const express = require("express");
const { protectRoutes } = require("../middlewares/protectRoutes");

const path = require("path");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByFirstName,
  updateMyData,
  updateUsers,
  getUserForSideBare,
} = require("../controllers/crudUsers"); // Fix the casing of the file name
const multer = require("multer");
const User = require("../models/userModule"); // Assuming you have a User model defined
const jwt = require("jsonwebtoken"); // For token verification
const bcrypt = require("bcrypt"); // For password hashing

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });
const crudUserRoutes = express.Router();

crudUserRoutes.post("/create", createUser);
crudUserRoutes.get("/all", getAllUsers);
crudUserRoutes.get("/getUserforsidebare", protectRoutes, getUserForSideBare);
crudUserRoutes.get("/getUserById/:id", getUserById);
crudUserRoutes.get("/getUserByFirstName/:firstName", getUserByFirstName);
crudUserRoutes.put("/update/:id", updateUserById);
crudUserRoutes.delete("/delete/:id", deleteUserById);
crudUserRoutes.put("/updateMyData", updateMyData);
crudUserRoutes.put("/updateUsers/:id", updateUsers);
crudUserRoutes.put(
  "/updateUserss/:id",
  upload.single("avatar"),
  async (req, res) => {
    try {
      const updatedData = req.body;
      if (req.file) {
        updatedData.avatar = req.file.path;
      }
      if (updatedData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(updatedData.password, salt);
      }
      const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
      });
      res.json({ message: "Profile updated successfully", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
);
crudUserRoutes.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "./uploads", filename);
  res.sendFile(filePath);
});

module.exports = crudUserRoutes;
