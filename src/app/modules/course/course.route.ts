import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controller";

const router = express.Router();

router.post(
  "/",
  validationMiddleware(CourseValidation.CreateCourseValidationSchema),
  CourseController.createCourse
);

router.get("/best", CourseController.getBestCourses);

export const CourseRoute = router;
