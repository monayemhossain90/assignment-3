import httpStatus from "http-status";
import catchError from "../../utils/catchError";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.services";

const createCourseCategory = catchError(async (req, res) => {
  const result = await CategoryServices.createCourseCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getCourseCategories = catchError(async (req, res) => {
  const result = await CategoryServices.getCourseCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

export const CategoryController = {
   createCourseCategory,
   getCourseCategories,
};
