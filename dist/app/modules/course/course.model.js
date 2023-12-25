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
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const appErrors_1 = __importDefault(require("../../errors/appErrors"));
const TagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const DetailsSchema = new mongoose_1.Schema({
    level: {
        type: String,
        required: true,
        enum: ["Beginner", "Intermediate", "Advanced"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
        trim: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    price: {
        type: Number,
        required: true,
    },
    tags: [TagsSchema],
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: {
        type: Number,
        required: true,
    },
    details: DetailsSchema,
});
CourseSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isCourseExist = yield exports.Course.findOne({
            title: this.get("title"),
        });
        if (isCourseExist) {
            throw new appErrors_1.default(http_status_1.default.BAD_REQUEST, "Course with this title already exists");
        }
        next();
    });
});
CourseSchema.statics.isCourseExist = function (_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = yield this.findOne({ _id });
        return course;
    });
};
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
