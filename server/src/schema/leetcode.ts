import { z } from "zod";

// Define schema for the header section
const HeaderSchema = z.object({
   type: z.literal("header"),
   title: z.string(),
   description: z.string(),
});

// Define schema for examples
const ExampleSchema = z.object({
   number: z.string(),
   inputs: z.string(),
   output: z.string(),
});

// Define schema for the examples section
const ExamplesSectionSchema = z.object({
   type: z.literal("examples"),
   examples: z.array(ExampleSchema),
});

// Define schema for constraints section
const ConstraintsSectionSchema = z.object({
   type: z.literal("constraints"),
   constraints: z.array(z.string()),
});

// Define schema for additional information section
const AdditionalInformationSchema = z.object({
   type: z.literal("additional_information"),
   description: z.string(),
});

// Define schema for a section (union of all section types)
const SectionSchema = z.union([
   HeaderSchema,
   ExamplesSectionSchema,
   ConstraintsSectionSchema,
   AdditionalInformationSchema,
]);

// Define schema for a question object
const QuestionObjectSchema = z.object({
   sections: z.array(SectionSchema),
});

// Define the schema for the entire JSON structure
export const questionSchema = z.array(QuestionObjectSchema);

// Type exports
export type QuestionSchema = z.infer<typeof questionSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Header = z.infer<typeof HeaderSchema>;
export type ExamplesSection = z.infer<typeof ExamplesSectionSchema>;
export type Example = z.infer<typeof ExampleSchema>;
export type ConstraintsSection = z.infer<typeof ConstraintsSectionSchema>;
export type AdditionalInformation = z.infer<typeof AdditionalInformationSchema>;
