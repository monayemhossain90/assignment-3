"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
});
const Review = (0, mongoose_1.model)("Review", ReviewSchema);
exports.default = Review;
