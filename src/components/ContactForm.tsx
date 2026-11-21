"use client";

import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormData,
} from "@/features/contact/contact.schema";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit contact form");
      }

      sessionStorage.setItem(
        "confirmationMessage",
        responseData.message || "Your message has been sent successfully.",
      );

      reset();
      router.push("/confirmation");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit contact form",
      );
      console.error("Error submitting contact form:", error);
    }
  };

  const onError = (formErrors: FieldErrors<ContactFormData>) => {
    console.log("Validation errors:", formErrors);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4 mt-4"
    >
      <div className="flex flex-col mx-4">
        <label htmlFor="fullName" className="text-lg">
          Full name
        </label>
        <input
          id="fullName"
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="p-2 border-2 border-softbrand flex-1 focus:outline-brand focus:outline-1 focus:border-brand"
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="text-brand m-0">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="flex flex-col mx-4">
        <label htmlFor="subject" className="text-lg">
          Subject
        </label>
        <input
          id="subject"
          {...register("subject")}
          aria-invalid={errors.subject ? "true" : "false"}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="p-2 border-2 border-softbrand flex-1 focus:outline-brand focus:outline-1 focus:border-brand"
        ></input>
        {errors.subject && (
          <p id="subject-error" role="alert" className="text-brand m-0">
            {errors.subject.message}
          </p>
        )}
      </div>

      <div className="flex flex-col mx-4">
        <label htmlFor="email" className="text-lg">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="p-2 border-2 border-softbrand flex-1 focus:outline-brand focus:outline-1 focus:border-brand"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="text-brand m-0">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col mx-4 mb-4">
        <label htmlFor="message" className="text-lg">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="p-2 border-2 border-softbrand flex-1 focus:outline-brand focus:outline-1 focus:border-brand"
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-brand m-0">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="p-5 bg-brand text-background font-bold w-full text-2xl text-center md:mt-5"
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
      {submitError && (
        <p role="alert" className="text-brand">
          {submitError}
        </p>
      )}
    </form>
  );
}
