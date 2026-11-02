import { z } from "zod";

const NAME_REGEX = /^[a-zA-ZæøåÆØÅ .'-]+$/;

export const ContactFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { error: "Name must be at least 3 characters." })
    .regex(NAME_REGEX, { error: "Name contains invalid characters." }),
  subject: z
    .string()
    .trim()
    .min(3, { error: "Subject must be at least 3 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Email is required." })
    .pipe(z.email({ error: "Invalid email format." })),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message must be at least 10 characters." }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
