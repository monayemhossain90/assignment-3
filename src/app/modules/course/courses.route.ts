import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { CourseValidation } from "./course.validation";
import { CourseController } from "./course.controller";

const router = express.Router();

router.get("/", CourseController.getAllCourses);

router.put(
  "/:courseId",
  validationMiddleware(CourseValidation.UpdateCourseValidationSchema),
  CourseController.updateCourseById
);

router.get("/:courseId/reviews", CourseController.getCourseByIdWithReview);

export const CoursesRoutes = router;
