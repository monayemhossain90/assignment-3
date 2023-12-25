import catchError from "../../utils/catchError";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.services";

const createCourse = catchError(async (req, res) => {
  const { body } = req;
  const course = await CourseServices.createCourse(body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Course created successfully",
    data: course,
  });
});

const getAllCourses = catchError(async (req, res) => {
  const { query } = req;
  const courses = await CourseServices.getAllCourses(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Courses fetched successfully",
    meta: {
      page: Number(query?.page) || 1,
      limit: Number(query?.limit) || 10,
      total: await CourseServices.countCourses(),
    },
    data: courses,
  });
});

const getCourseByIdWithReview = catchError(async (req, res) => {
  const { courseId } = req.params;
  const course = await CourseServices.getCourseByIdWithReview(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course and Reviews retrieved successfully",
    data: course,
  });
});

const updateCourseById = catchError(async (req, res) => {
  const { courseId } = req.params;
  const body = req.body;
  const updatedCourse = await CourseServices.updateCourseById(courseId, body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course updated successfully",
    data: updatedCourse,
  });
});

const getBestCourses = catchError(async (req, res) => {
  const course = await CourseServices.getBestCourses();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Best course retrieved successfully",
    data: course,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getCourseByIdWithReview,
  updateCourseById,
  getBestCourses,
};
