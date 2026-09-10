import { FormEvent, ChangeEvent, useState } from "react";
import { Mail, MapPin, Phone, Clock, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit your inquiry."
        );
      }

      setSuccessMessage(
        "Your message has been sent successfully. We'll get back to you soon."
      );

      setFormData(initialForm);
    } catch (error) {
      console.error("Contact form error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">

        {/* Contact information */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Let's build something great together.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-gray-400">
            Have a project in mind? Tell us what you're building and our team
            will get back to you.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4">
              <Mail className="text-cyan-400" size={20} />
              <span className="text-gray-300">hello@webdevv.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-cyan-400" size={20} />
              <span className="text-gray-300">+254 700 123 456</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-cyan-400" size={20} />
              <span className="text-gray-300">Nairobi, Kenya</span>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="text-cyan-400" size={20} />
              <span className="text-gray-300">Mon - Fri: 9AM - 6PM</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm text-gray-400"
              >
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-gray-400"
              >
                Your Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="mb-2 block text-sm text-gray-400"
            >
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="w-full rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-gray-400"
            >
              Your Message
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-sm outline-none transition placeholder:text-gray-600 focus:border-cyan-400"
            />
          </div>

          {successMessage && (
            <div className="mt-4 rounded-lg border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-400">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
