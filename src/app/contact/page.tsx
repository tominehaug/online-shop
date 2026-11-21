import ContactForm from "@/components/ContactForm";
import BackButton from "@/components/BackButton";

export default function ContactPage() {
  return (
    <div className="sm:w-xl md:w-2xl sm:block sm:mx-auto mb-10 md:mt-10">
      <div className="ml-4">
        <BackButton />
      </div>
      <h1 className="text-4xl uppercase mx-4 font-heading">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
