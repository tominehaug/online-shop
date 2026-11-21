import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

export default function ContactPage() {
  return (
    <div className="sm:w-xl md:w-2xl sm:block sm:mx-auto mb-10 md:mt-10">
      <BackButton />
      <h1 className="text-xl font-semibold uppercase mx-4">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
