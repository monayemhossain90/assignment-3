"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const ReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            invalid_type_error: "Course ID must be string",
        }),
        rating: zod_1.z
            .number({
            invalid_type_error: "Rating must be number",
        })
            .positive({
            message: "Rating must be positive",
        })
            .min(1, {
            message: "Rating must be greater than or equal to 1",
        })
            .max(5, {
            message: "Rating must be less than or equal to 5",
        }),
        review: zod_1.z.string({
            invalid_type_error: "Review must be string",
        }),
    }),
});
exports.ReviewValidation = {
    ReviewValidationSchema,
};
