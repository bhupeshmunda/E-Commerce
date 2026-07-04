import express from "express";
import formidable from "express-formidable";
const router = express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filteredProduct,
} from "../controllers/productController.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);

router.get("/top", fetchTopProducts);

router.get("/new", fetchNewProducts);

router.route("/filtered-products").post(filteredProduct);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .get(fetchProductById)
  .delete(authenticate, authorizeAdmin, removeProduct);

router
  .route("/:id/reviews")
  .post(authenticate, checkId, addProductReview);

export default router;
