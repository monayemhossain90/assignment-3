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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const course_model_1 = require("./course.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const appErrors_1 = __importDefault(require("../../errors/appErrors"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Calculating duration
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);
    const durationInWeeks = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7));
    payload.durationInWeeks = durationInWeeks;
    const createdCourse = yield course_model_1.Course.create(payload);
    return createdCourse;
});
const getAllCourses = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const countCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield course_model_1.Course.countDocuments();
    return count;
});
const getCourseByIdWithReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCourseExist = yield course_model_1.Course.isCourseExist(id);
    if (!isCourseExist) {
        throw new appErrors_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    else {
        const result = yield course_model_1.Course.aggregate([
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "courseId",
                    as: "reviews",
                },
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ]);
        const course = result[0];
        return course;
    }
});
const updateCourseById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCourseExist = yield course_model_1.Course.isCourseExist(id);
    if (!isCourseExist) {
        throw new appErrors_1.default(http_status_1.default.NOT_FOUND, "Course not found");
    }
    else {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const course = yield course_model_1.Course.findById(id);
            const { details, tags } = payload, remaining = __rest(payload, ["details", "tags"]);
            const modifiedPayload = Object.assign({}, remaining);
            if (tags && tags.length) {
                const courseTags = course === null || course === void 0 ? void 0 : course.tags.map((tag) => tag.name);
                // New tags
                const newTags = tags.filter((tag) => !(courseTags === null || courseTags === void 0 ? void 0 : courseTags.includes(tag === null || tag === void 0 ? void 0 : tag.name)));
                const deletedNewTags = newTags.filter((tag) => tag.isDeleted);
                // Old tags
                const oldTags = tags.filter((tag) => courseTags === null || courseTags === void 0 ? void 0 : courseTags.includes(tag === null || tag === void 0 ? void 0 : tag.name));
                const deletedTags = oldTags.filter((tag) => tag.isDeleted);
                const nonDeletedTags = oldTags.filter((tag) => !tag.isDeleted);
                // check if tag is new
                if (newTags.length) {
                    //  check if new tag is deleted
                    if (deletedNewTags.length) {
                        throw new appErrors_1.default(http_status_1.default.BAD_REQUEST, "New tag cannot be deleted");
                    }
                    modifiedPayload.$addToSet = {
                        tags: {
                            $each: newTags
                                .filter((tag) => !(courseTags === null || courseTags === void 0 ? void 0 : courseTags.includes(tag === null || tag === void 0 ? void 0 : tag.name)))
                                .filter((tag, index, self) => self.findIndex((t) => t.name === tag.name) === index),
                        },
                    };
                }
                // check if tag exists in course
                if (oldTags.length) {
                    //  check if tag is deleted
                    if (deletedTags.length) {
                        modifiedPayload.$pull = {
                            tags: {
                                name: {
                                    $in: deletedTags.map((tag) => tag.name),
                                },
                            },
                        };
                    }
                    //  check if tag is not deleted
                    if (nonDeletedTags.length) {
                        const tagNames = nonDeletedTags.map((tag) => tag.name).join(", ");
                        throw new appErrors_1.default(http_status_1.default.BAD_REQUEST, `${tagNames} already exists in this course`);
                    }
                }
            }
            if (details) {
                for (const [key, value] of Object.entries(details)) {
                    modifiedPayload[`details.${key}`] = value;
                }
            }
            // if startDate and endDate is modified, then update durationInWeeks
            if (payload.startDate && payload.endDate) {
                const startDate = new Date(payload.startDate);
                const endDate = new Date(payload.endDate);
                const durationInWeeks = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7));
                modifiedPayload.durationInWeeks = durationInWeeks;
            }
            // if startDate or endDate is modified, then update durationInWeeks
            if (payload.startDate || payload.endDate) {
                const startDate = new Date(payload.startDate || (course === null || course === void 0 ? void 0 : course.startDate) || "");
                const endDate = new Date(payload.endDate || (course === null || course === void 0 ? void 0 : course.endDate) || "");
                const durationInWeeks = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7));
                modifiedPayload.durationInWeeks = durationInWeeks;
            }
            const updatedCourse = yield course_model_1.Course.findByIdAndUpdate(id, modifiedPayload, {
                new: true,
            });
            yield session.commitTransaction();
            session.endSession();
            return updatedCourse;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            const dynamicErrorMessage = error.message
                ? `Failed to update course. ${error.message}`
                : "Failed to update course";
            throw new appErrors_1.default(http_status_1.default.BAD_REQUEST, dynamicErrorMessage);
        }
    }
});
const getBestCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.aggregate([
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "courseId",
                as: "reviews",
            },
        },
        {
            $addFields: {
                averageRating: {
                    $avg: "$reviews.rating",
                },
                reviewCount: {
                    $size: "$reviews",
                },
            },
        },
        {
            $sort: {
                averageRating: -1,
            },
        },
        {
            $limit: 1,
        },
        {
            $project: {
                __v: 0,
                reviews: 0,
            },
        },
    ]);
    const course = result[0];
    return course;
});
exports.CourseServices = {
    createCourse,
    getAllCourses,
    getCourseByIdWithReview,
    updateCourseById,
    countCourses,
    getBestCourses,
};
