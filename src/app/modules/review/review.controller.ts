import httpStatus from "http-status";
import catchError from "../../utils/catchError";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.services";


const createReview = catchError(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
