import { z } from "zod";

const createCategory = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Category name must be string",
    }),
  }),
});

export const CategoryValidation = {
  createCategory,
};
