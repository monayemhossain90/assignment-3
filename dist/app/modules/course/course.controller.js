"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const catchError_1 = __importDefault(require("../../utils/catchError"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_services_1 = require("./course.services");
const createCourse = (0, catchError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const course = yield course_services_1.CourseServices.createCourse(body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Course created successfully",
        data: course,
    });
}));
const getAllCourses = (0, catchError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const courses = yield course_services_1.CourseServices.getAllCourses(query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Courses fetched successfully",
        meta: {
            page: Number(query === null || query === void 0 ? void 0 : query.page) || 1,
            limit: Number(query === null || query === void 0 ? void 0 : query.limit) || 10,
            total: yield course_services_1.CourseServices.countCourses(),
        },
        data: courses,
    });
}));
const getCourseByIdWithReview = (0, catchError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const course = yield course_services_1.CourseServices.getCourseByIdWithReview(courseId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course and Reviews retrieved successfully",
        data: course,
    });
}));
const updateCourseById = (0, catchError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const body = req.body;
    const updatedCourse = yield course_services_1.CourseServices.updateCourseById(courseId, body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
    });
}));
const getBestCourses = (0, catchError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_services_1.CourseServices.getBestCourses();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Best course retrieved successfully",
        data: course,
    });
}));
exports.CourseController = {
    createCourse,
    getAllCourses,
    getCourseByIdWithReview,
    updateCourseById,
    getBestCourses,
};
