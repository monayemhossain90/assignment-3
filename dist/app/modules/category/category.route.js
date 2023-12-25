"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationMiddleware_1 = __importDefault(require("../../middlewares/validationMiddleware"));
const category_validation_1 = require("./category.validation");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/", (0, validationMiddleware_1.default)(category_validation_1.CategoryValidation.createCategory), category_controller_1.CategoryController.createCourseCategory);
router.get("/", category_controller_1.CategoryController.getCourseCategories);
exports.CategoryRoutes = router;
