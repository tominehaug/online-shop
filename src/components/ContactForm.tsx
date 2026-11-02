"use client";

import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormData,
} from "@/features/contact/contact.schema";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: "",
      subject: "",
      email: "",
      message: "",
    },
    mode: "onBlur",
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form data:", data);
    alert(
      `Thank you, ${data.fullName}! Your message about ${data.subject} has been registered.`,
    );
    reset();
    router.push("/takk"); //fikse denne hvis jeg vil ha en takk-side etter submit
  };

  const onError = (formErrors: FieldErrors<ContactFormData>) => {
    console.log("Validation errors:", formErrors);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <h1>Contact us</h1>

      <div>
        <label htmlFor="fullName">Full name:</label>
        <input
          id="fullName"
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && (
          <p
            id="fullName-error"
            role="alert"
            style={{ color: "red", fontSize: "0.9em", margin: "0" }}
          >
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          id="subject"
          {...register("subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        ></input>
        {errors.subject && (
          <p
            id="subject-error"
            role="alert"
            style={{ color: "red", fontSize: "0.9em", margin: "0" }}
          >
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p
            id="email-error"
            role="alert"
            style={{ color: "red", fontSize: "0.9em", margin: "0" }}
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            style={{ color: "red", fontSize: "0.9em", margin: "0" }}
          >
            {errors.message.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
