import express from "express";
const router = express.Router();
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

router.route("/").post(authenticate, authorizeAdmin, createCategory);

router.route("/categories").get(listCategory);

router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .get(readCategory)
  .delete(authenticate, authorizeAdmin, removeCategory);



export default router;
