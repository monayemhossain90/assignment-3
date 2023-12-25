"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = void 0;
const zod_1 = require("zod");
const TagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "Tag name must be string",
    }),
    isDeleted: zod_1.z.boolean().default(false),
});
const DetailsValidationSchema = zod_1.z.object({
    level: zod_1.z.enum(["Beginner", "Intermediate", "Advanced"], {
        invalid_type_error: "Level must be Beginner, Intermediate or Advanced",
    }),
    description: zod_1.z.string({
        invalid_type_error: "Description must be string",
    }),
});
const CreateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: "Title must be string",
        }),
        instructor: zod_1.z.string({
            invalid_type_error: "Instructor must be string",
        }),
        categoryId: zod_1.z.string({
            invalid_type_error: "Category ID must be string",
        }),
        price: zod_1.z
            .number({
            invalid_type_error: "Price must be number",
        })
            .positive({
            message: "Price must be positive",
        }),
        tags: zod_1.z.array(TagsValidationSchema),
        startDate: zod_1.z.string({
            invalid_type_error: "Start date must be string",
        }),
        endDate: zod_1.z.string({
            invalid_type_error: "End date must be string",
        }),
        language: zod_1.z.string({
            invalid_type_error: "Language must be string",
        }),
        provider: zod_1.z.string({
            invalid_type_error: "Provider must be string",
        }),
        details: DetailsValidationSchema,
    }),
});
const UpdateTagsValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        invalid_type_error: "Tag name must be string",
    }),
    isDeleted: zod_1.z.boolean().default(false),
});
const UpdateDetailsValidationSchema = zod_1.z.object({
    level: zod_1.z
        .enum(["Beginner", "Intermediate", "Advanced"], {
        invalid_type_error: "Level must be Beginner, Intermediate or Advanced",
    })
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: "Description must be string",
    })
        .optional(),
});
const UpdateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        instructor: zod_1.z
            .string({
            invalid_type_error: "Instructor must be string",
        })
            .optional(),
        categoryId: zod_1.z
            .string({
            invalid_type_error: "Category ID must be string",
        })
            .optional(),
        price: zod_1.z
            .number({
            invalid_type_error: "Price must be number",
        })
            .positive({
            message: "Price must be positive",
        })
            .optional(),
        tags: zod_1.z.array(UpdateTagsValidationSchema).optional(),
        startDate: zod_1.z
            .string({
            invalid_type_error: "Start date must be string",
        })
            .optional(),
        endDate: zod_1.z
            .string({
            invalid_type_error: "End date must be string",
        })
            .optional(),
        language: zod_1.z
            .string({
            invalid_type_error: "Language must be string",
        })
            .optional(),
        provider: zod_1.z
            .string({
            invalid_type_error: "Provider must be string",
        })
            .optional(),
        details: UpdateDetailsValidationSchema.optional(),
    }),
});
exports.CourseValidation = {
    CreateCourseValidationSchema,
    UpdateCourseValidationSchema,
};
