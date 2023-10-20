import { Request, Response, NextFunction } from "express";
import { validationResult, body, oneOf } from "express-validator";

export const errorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
    // return res.status(422).json({ errors: errors.array() });
  }
  next();
};

export const postUpdateValidator = [
  body("title").isString().withMessage("Title must be a string"),
  body("body").isString().withMessage("Body must be a string"),
  body("productId").isString().withMessage("Product ID must be a string"),
  body("version").optional().isString().withMessage("Version must be a string"),
];

export const putUpdateValidator = [
  body("title").optional().isString().withMessage("Title must be a string"),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("body").optional().isString().withMessage("Body must be a string"),
];

export const postUpdatePointValidator = [
  body("name").isString().withMessage("Name must be a string"),
  body("description").isString().withMessage("Description must be a string"),
  body("updateId").isString().withMessage("Update ID must be a string"),
];

export const putUpdatePointValidator = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];
