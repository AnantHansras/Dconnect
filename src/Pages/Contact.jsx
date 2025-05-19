/* "use client" */

import React, { useState } from "react";
import { MapPin, Mail, Clock,Send } from "lucide-react";
import Footer from "../Components/Footer";
import svg from "../assets/contact.svg";
export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block bg-[#4A90E250] px-3 py-1 text-sm text-[var(--secondary-foreground)] mb-4 rounded" style={{borderRadius: "var(--radius)"}}>
            Contact Us
          </div>
          <h1 className="text-4xl font-bold mb-6">Let's start a conversation</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
            Have a question or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="border border-[var(--border)] p-6 rounded-lg shadow bg-[var(--card)] flex flex-col justify-center items-center text-center" style={{borderRadius: "var(--radius)"}}>
            <MapPin className="h-6 w-6 text-[#4A90E2] mb-2" />
            <h3 className="font-bold text-[var(--card-foreground)]">Visit Us</h3>
            <p className="text-[var(--muted-foreground)]">123 Innovation Drive, San Francisco, CA 94103</p>
          </div>
          <div className="border border-[var(--border)] p-6 rounded-lg shadow bg-[var(--card)] flex flex-col justify-center items-center text-center" style={{borderRadius: "var(--radius)"}}>
            <Mail className="h-6 w-6 text-[#4A90E2] mb-2" />
            <h3 className="font-bold text-[var(--card-foreground)]">Email Us</h3>
            <a href="mailto:hello@example.com" className="text-[var(--primary)] underline">
              hello@example.com
            </a>
          </div>
          <div className="border border-[var(--border)] p-6 rounded-lg shadow bg-[var(--card)] flex flex-col justify-center items-center text-center" style={{borderRadius: "var(--radius)"}}>
            <Clock className="h-6 w-6 text-[#4A90E2] mb-2" />
            <h3 className="font-bold text-[var(--card-foreground)]">Working Hours</h3>
            <p className="text-[var(--muted-foreground)]">Mon - Fri: 9 AM - 6 PM</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <form onSubmit={handleSubmit} className="space-y-4 border border-[#4A90E2] p-6 rounded-lg">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-[var(--input)] p-2 flex-1 bg-[var(--card)] text-[var(--foreground)]"
                style={{ borderRadius: "var(--radius)" }}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-[var(--input)] p-2 flex-1 bg-[var(--card)] text-[var(--foreground)]"
                style={{ borderRadius: "var(--radius)" }}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="border border-[var(--input)] p-2 w-full bg-[var(--card)] text-[var(--foreground)]"
              style={{ borderRadius: "var(--radius)" }}
              required
            />
            <textarea
              placeholder="Your Message"
              className="border border-[var(--input)]  p-2 w-full h-24 bg-[var(--card)] text-[var(--foreground)]"
              style={{ borderRadius: "var(--radius)" }}
              required
            ></textarea>
            <button
              type="submit"
              className={`px-4 py-2 rounded flex flex-row justify-center items-center text-[var(--primary-foreground)] ${
                isSubmitted
                  ? "bg-[#4A90E2]"
                  : "bg-[#4A90E2]"
              }`}
              style={{ borderRadius: "var(--radius)" }}
            >
              <Send className="w-5 h-5 mr-2" />
              <p>{isSubmitted ? "Message Sent" : "Send Message"}</p>
            </button>
          </form>

          <div className=" p-6 rounded-lg" style={{borderRadius: "var(--radius)"}}>
            <div className="h-64  flex items-center justify-center rounded" style={{borderRadius: "var(--radius)"}}>
              <img
                          src={svg}
                          alt="Illustration"
                          className="w-full h-full object-contain"
                        />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[var(--muted)] rounded-2xl p-8 md:p-12 mb-16" style={{borderRadius: "var(--radius)"}}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Frequently Asked Questions</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Find quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "What services do you offer?",
                answer:
                  "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and digital marketing solutions tailored to your business needs.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex application could take several months. We'll provide a detailed timeline during our initial consultation.",
              },
              {
                question: "Do you offer ongoing support?",
                answer:
                  "Yes, we offer various support and maintenance packages to ensure your digital products continue to perform optimally after launch. Our team is always available to address any issues or implement updates.",
              },
              {
                question: "How do we get started working together?",
                answer:
                  "Simply fill out our contact form or give us a call. We'll schedule an initial consultation to discuss your project requirements, goals, and how we can help you achieve them.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-bold text-[var(--foreground)]">{faq.question}</h3>
                <p className="text-[var(--muted-foreground)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
