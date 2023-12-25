import express from "express";
import validationMiddleware from "../../middlewares/validationMiddleware";
import { ReviewValidation } from "./review.validation";
import { ReviewController } from "./review.controller";


const router = express.Router();

router.post(
  "/",
  validationMiddleware(ReviewValidation.ReviewValidationSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
