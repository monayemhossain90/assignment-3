import { z } from "zod";

const ReviewValidationSchema = z.object({
  body: z.object({
    courseId: z.string({
      invalid_type_error: "Course ID must be string",
    }),
    rating: z
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
    review: z.string({
      invalid_type_error: "Review must be string",
    }),
  }),
});

export const ReviewValidation = {
  ReviewValidationSchema,
};
