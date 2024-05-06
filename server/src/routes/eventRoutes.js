// calendarRoutes.js

const express = require("express");
const routerCalendar = express.Router();
const nodemailer = require("nodemailer");
const moment = require("moment");

const Event = require("../models/events");
const User = require("../models/userModule");

routerCalendar.get("/getEvents", async (req, res) => {
  const events = await Event.find({
    start: { $gte: moment(req.query.start).toDate() },
    end: { $lte: moment(req.query.end).toDate() },
  });
  res.status(200).send(events);
});

routerCalendar.post("/createEvent", async (req, res) => {
  const eventData = req.body;

  // Extract data from the request body
  const { title, start, end, googleMeetURL } = req.body;

  // Validate the data
  if (!title || !start || !end || !googleMeetURL) {
    return res.status(400).send({ error: "Missing required data" });
  }

  // Save the event to the database
  const event = new Event({
    title,
    start,
    end,
    googleMeetURL,
  });

  try {
    const savedEvent = await event.save();

    // Send email notifications to STUDENT users with the Google Meet link
    await sendNotificationToStudents(savedEvent);

    res.status(201).send(savedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Function to send email notifications to STUDENT users with the Google Meet link
async function sendNotificationToStudents(event) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "yassinedebich214@gmail.com",
      pass: "ubys bnok ansx abpv",
    },
  });

  const { title, start, end, googleMeetURL } = event;

  // Fetch STUDENT users from the database
  const students = await User.find({ role: "STUDENT" });

  // Construct email content
  const mailOptions = {
    from: "yassinedebich214@gmail.com",
    subject: `Invitation to ${title}`,
    html: `
      <h2>Vous êtes invité à rejoindre la réunion "${title}"</h2>
      <p>Heure de début: ${start}</p>
      <p>Heure de fin: ${end}</p>
      <p>Lien Google Meet: <a href="${googleMeetURL}">${googleMeetURL}</a></p>
    `,
  };

  // Send emails to all STUDENT users
  for (const student of students) {
    mailOptions.to = student.email;
    await transporter.sendMail(mailOptions);
  }
}

module.exports = routerCalendar;
