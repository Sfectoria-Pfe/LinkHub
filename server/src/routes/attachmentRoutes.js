const express = require("express");
const {
  createAttachment,
  getAllAttachments,
  getAttachmentById,
  updateAttachmentById,
  deleteAttachmentById,
  getAllAttachmentsInCourse,
} = require("../controllers/attachment");

const attachmentRouter = express.Router();
attachmentRouter.post("/create", createAttachment);
attachmentRouter.get("/all", getAllAttachments);
attachmentRouter.get(
  "/getAllAttachmentsInCourse/:courseId",
  getAllAttachmentsInCourse
);

attachmentRouter.get("/getAttachmentById/:id", getAttachmentById);
attachmentRouter.put("/update/:id", updateAttachmentById);
attachmentRouter.delete("/delete/:id", deleteAttachmentById);

module.exports = attachmentRouter;
