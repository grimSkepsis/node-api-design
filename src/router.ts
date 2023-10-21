import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  errorHandler,
  postUpdatePointValidator,
  postUpdateValidator,
  putUpdatePointValidator,
  putUpdateValidator,
} from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdateById,
  getUpdates,
  updateUpdate,
} from "./handlers/update";
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getUpdatePointById,
  getUpdatePoints,
  updateUpdatePoint,
} from "./handlers/updatePoint";
const router = Router();

/**
 * Products
 */

// GET all products
router.get("/product", getProducts);

// GET a single product by ID
router.get("/product/:id", getProductById);

// CREATE a new product
router.post("/product", body("name").isString(), errorHandler, createProduct);

// UPDATE an existing product by ID
router.put(
  "/product/:id",
  body("name").isString(),
  errorHandler,
  updateProduct
);

// DELETE an existing product by ID
router.delete("/product/:id", deleteProduct);

/**
 * Updates
 */

// GET all updates
router.get("/update", getUpdates);

// GET a single update by ID
router.get("/update/:id", getUpdateById);

// CREATE a new update
router.post("/update", postUpdateValidator, errorHandler, createUpdate);

// UPDATE an existing update by ID
router.put("/update/:id", putUpdateValidator, errorHandler, updateUpdate);

// DELETE an existing update by ID
router.delete("/update/:id", deleteUpdate);

/**
 * Updatepoints
 */

// GET all updatepoints
router.get("/updatepoint", getUpdatePoints);

// GET a single updatepoint by ID
router.get("/updatepoint/:id", getUpdatePointById);

// CREATE a new updatepoint
router.post(
  "/updatepoint",
  postUpdatePointValidator,
  errorHandler,
  createUpdatePoint
);

// UPDATE an existing updatepoint by ID
router.put(
  "/updatepoint/:id",
  putUpdatePointValidator,
  errorHandler,
  updateUpdatePoint
);

// DELETE an existing updatepoint by ID
router.delete("/updatepoint/:id", deleteUpdatePoint);

export default router;
