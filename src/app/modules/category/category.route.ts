import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post(
  "/",
  validationMiddleware(CategoryValidation.createCategory),
  CategoryController.createCourseCategory
);
router.get("/", CategoryController.getCourseCategories);

export const CategoryRoutes = router;
