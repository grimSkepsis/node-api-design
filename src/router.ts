import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  errorHandler,
  postUpdatePointValidator,
  postUpdateValidator,
  putUpdatePointValidator,
  putUpdateValidator,
} from "./modules/middleware";
const router = Router();

/**
 * Products
 */

// GET all products
router.get("/product", (req, res) => {
  // TODO: Implement handler
  res.end(`Hello World (product)${req.shhh}!}`);
});

// GET a single product by ID
router.get("/product/:id", (req, res) => {
  // TODO: Implement handler
});

// CREATE a new product
router.post("/product", body("name").isString(), errorHandler, (req, res) => {
  // TODO: Implement handler
});

// UPDATE an existing product by ID
router.put(
  "/product/:id",
  body("name").isString(),
  errorHandler,
  (req, res) => {
    res.end(`Hello World (product put)${req.shhh}!}`);
  }
);

// DELETE an existing product by ID
router.delete("/product/:id", (req, res) => {
  // TODO: Implement handler
});

/**
 * Updates
 */

// GET all updates
router.get("/update", (req, res) => {
  // TODO: Implement handler
});

// GET a single update by ID
router.get("/update/:id", (req, res) => {
  // TODO: Implement handler
});

// CREATE a new update
router.post("/update", postUpdateValidator, errorHandler, (req, res) => {
  // TODO: Implement handler
});

// UPDATE an existing update by ID
router.put("/update/:id", putUpdateValidator, errorHandler, (req, res) => {
  // TODO: Implement handler
});

// DELETE an existing update by ID
router.delete("/update/:id", (req, res) => {
  // TODO: Implement handler
});

/**
 * Updatepoints
 */

// GET all updatepoints
router.get("/updatepoint", (req, res) => {
  // TODO: Implement handler
});

// GET a single updatepoint by ID
router.get("/updatepoint/:id", (req, res) => {
  // TODO: Implement handler
});

// CREATE a new updatepoint
router.post(
  "/updatepoint",
  postUpdatePointValidator,
  errorHandler,
  (req, res) => {
    // TODO: Implement handler
  }
);

// UPDATE an existing updatepoint by ID
router.put(
  "/updatepoint/:id",
  putUpdatePointValidator,
  errorHandler,
  (req, res) => {
    // TODO: Implement handler
  }
);

// DELETE an existing updatepoint by ID
router.delete("/updatepoint/:id", (req, res) => {
  // TODO: Implement handler
});

export default router;
