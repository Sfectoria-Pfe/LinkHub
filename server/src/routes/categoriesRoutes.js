const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCoursesInCategory,
  getImage,
  joinCategory,
  getJoinedCategories,
} = require("../controllers/categories");
const { upload } = require("../controllers/categories.js");

const categoryRouter = express.Router();
const authentificateToken = require("../middlewares/fetchUser.js");
categoryRouter.post("/create", upload.single("imageUrl"), createCategory);

categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/getCategoryById/:id", getCategoryById);
categoryRouter.get("/getAllCoursesInCategory/:id", getAllCoursesInCategory);
categoryRouter.put("/update/:id", updateCategoryById);
categoryRouter.delete("/delete/:id", deleteCategoryById);

// Route for getting image of a specific category
categoryRouter.get("/getImage/:id", getImage); // Include ':id' as a parameter
categoryRouter.post("/join/:categoryId", authentificateToken, joinCategory);
categoryRouter.get("/joined", authentificateToken, getJoinedCategories); // Define route for getting joined categories

module.exports = categoryRouter;
