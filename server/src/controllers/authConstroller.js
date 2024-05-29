const User = require("../models/userModule");
const createError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../lib/nodeMailer");

// register a user
exports.signup = async (req, res, next) => {
  try {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let activationCode = "";
    for (let i = 0; i < 25; i++) {
      activationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already exists", 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      activationCode: activationCode,
    });
    await newUser.save();

    // Send email with activation code
    sendConfirmationEmail(newUser.email, newUser.activationCode);

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "secretkey123", {
      expiresIn: "90d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
    }); // 90 days

    // Send response with token and user data
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        activationCode: newUser.activationCode,
      },

    });
        sendNotification("success", "New user registered!");

  } catch (err) {
    next(err);
  }
};



// verify user
exports.verifyUser = async (req, res, next) => {
  User.findOne({ activationCode: req.params.activationCode }).then((user) => {
    if (!user) {
      return res.send({
        message: "ce code d'activation est faux",
      });
    }
    user.isActivee = false;
    user.save().then(() => {
      res.send({
        message: "votre compte est activé",
      });
    });
  });
};

// login a user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError("User not found", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new createError("Incorrect password", 401));
    }

    if (!user.isActivee) {
      return next(new createError("Account not activated", 403));
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "secretkey123", {
      expiresIn: "90d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 90 * 24 * 60 * 60 * 1000,
    }); // 90 days expiration
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        telephone: user.telephone,
        address: user.address,
        isActivee: user.isActivee,
        bio: user.bio,
      },
    });
  } catch (err) {
    next(err);
  }
};
// get me using token
exports.authentificateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return next(new createError("unauthorized", 401));
  jwt.verify(token, "secretkey123", async (err, user) => {
    if (err) return next(new createError("unauthorized", 401));
    const currentUser = await User.findById(user.id);
    if (!currentUser) {
      return next(new createError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      user: {
        _id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        role: currentUser.role,
        password: currentUser.password,
        avatar: currentUser.avatar,
        telephone: currentUser.telephone,
        address: currentUser.address,
        isActivee: currentUser.isActivee,
        bio: currentUser.bio,
      },
    });
  });
};

exports.activateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // Recherchez l'utilisateur par son ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Mettez à jour l'état d'activation de l'utilisateur
    user.isActivee = true;
    await user.save();
    // Réponse réussie
    res.status(200).json({ message: "User activated successfully" });
  } catch (err) {
    // Gestion des erreurs
    console.error("Error activating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// authController.js

// deactivate a user
exports.deactivateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's activation status
    user.isActivee = false;
    await user.save();
    // Successful response
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (err) {
    // Error handling
    console.error("Error deactivating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


