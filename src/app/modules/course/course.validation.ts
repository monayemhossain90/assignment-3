import { z } from "zod";

const TagsValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Tag name must be string",
  }),
  isDeleted: z.boolean().default(false),
});

const DetailsValidationSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    invalid_type_error: "Level must be Beginner, Intermediate or Advanced",
  }),
  description: z.string({
    invalid_type_error: "Description must be string",
  }),
});

const CreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: "Title must be string",
    }),
    instructor: z.string({
      invalid_type_error: "Instructor must be string",
    }),
    categoryId: z.string({
      invalid_type_error: "Category ID must be string",
    }),
    price: z
      .number({
        invalid_type_error: "Price must be number",
      })
      .positive({
        message: "Price must be positive",
      }),
    tags: z.array(TagsValidationSchema),
    startDate: z.string({
      invalid_type_error: "Start date must be string",
    }),
    endDate: z.string({
      invalid_type_error: "End date must be string",
    }),
    language: z.string({
      invalid_type_error: "Language must be string",
    }),
    provider: z.string({
      invalid_type_error: "Provider must be string",
    }),
    details: DetailsValidationSchema,
  }),
});

const UpdateTagsValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Tag name must be string",
  }),
  isDeleted: z.boolean().default(false),
});

const UpdateDetailsValidationSchema = z.object({
  level: z
    .enum(["Beginner", "Intermediate", "Advanced"], {
      invalid_type_error: "Level must be Beginner, Intermediate or Advanced",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be string",
    })
    .optional(),
});
const UpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z
      .string({
        invalid_type_error: "Instructor must be string",
      })
      .optional(),
    categoryId: z
      .string({
        invalid_type_error: "Category ID must be string",
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: "Price must be number",
      })
      .positive({
        message: "Price must be positive",
      })
      .optional(),
    tags: z.array(UpdateTagsValidationSchema).optional(),
    startDate: z
      .string({
        invalid_type_error: "Start date must be string",
      })
      .optional(),
    endDate: z
      .string({
        invalid_type_error: "End date must be string",
      })
      .optional(),
    language: z
      .string({
        invalid_type_error: "Language must be string",
      })
      .optional(),
    provider: z
      .string({
        invalid_type_error: "Provider must be string",
      })
      .optional(),
    details: UpdateDetailsValidationSchema.optional(),
  }),
});

export const CourseValidation = {
  CreateCourseValidationSchema,
  UpdateCourseValidationSchema,
};
