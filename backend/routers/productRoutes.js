import express from "express";
import { isAdmin, userVerify } from "../middleware/auth.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductPhoto,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create product router
router.post(
  "/create-product",
  userVerify,
  isAdmin,
  formidable(),
  createProduct
);

// update product
router.put(
  "/update-product/:pid",
  userVerify,
  isAdmin,
  formidable(),
  updateProduct
);

// get all product
router.get("/get-product", getAllProduct);

//get single product
router.get("/single-product/:slug", getSingleProduct);

// get product photo
router.get("/product-photo/:pid", getProductPhoto);

// delete product router
router.delete("/delete-product/:id", userVerify, isAdmin, deleteProduct);

export default router;