"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const course_validation_1 = require("./course.validation");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.get("/", course_controller_1.CourseController.getAllCourses);
router.put("/:courseId", (0, validationMiddleware_1.default)(course_validation_1.CourseValidation.UpdateCourseValidationSchema), course_controller_1.CourseController.updateCourseById);
router.get("/:courseId/reviews", course_controller_1.CourseController.getCourseByIdWithReview);
exports.CoursesRoutes = router;
