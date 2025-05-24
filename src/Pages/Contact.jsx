/* "use client" */

import React, { useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
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
          <div className="inline-block bg-[#4A90E250] px-3 py-1 text-sm text-[var(--secondary-foreground)] mb-4 rounded" style={{ borderRadius: "var(--radius)" }}>
            Contact Us
          </div>
          <h1 className="text-4xl font-bold mb-6">Let's start a conversation</h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl">
            Have a question or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[{
            Icon: MapPin,
            title: "Visit Us",
            content: "Jhalana gram JLN Marg, Malviya Nagar, Jaipur, Rajasthan 302017",
            link: "https://goo.gl/maps/3v1x5Z2g7Qk"
          }, {
            Icon: Mail,
            title: "Email Us",
            content: "dconnect2u@gmail.com",
            link: "mailto:dconnect2u@gmail.com"
          }, {
            Icon: Phone,
            title: "Contact Number",
            content: "7983668008"
          }].map((item, index) => (
            <div key={index} className="border border-[var(--border)] p-6 rounded-lg shadow bg-[var(--card)] flex flex-col justify-center items-center text-center transition duration-300 hover:shadow-lg hover:bg-[var(--card-hover)]" style={{ borderRadius: "var(--radius)" }}>
              <item.Icon className="h-6 w-6 text-[#4A90E2] mb-2" />
              <h3 className="font-bold text-[var(--card-foreground)]">{item.title}</h3>
              {item.link ? (
                <a href={item.link} className="text-[var(--primary)] ">
                  {item.content}
                </a>
              ) : (
                <p className="text-[var(--muted-foreground)]">{item.content}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <form onSubmit={handleSubmit} className="space-y-4 border border-[#4A90E2] p-6 rounded-lg transition duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="First Name" className="border border-[var(--input)] p-2 flex-1 bg-[var(--card)] text-[var(--foreground)] rounded-lg" required />
              <input type="text" placeholder="Last Name" className="border border-[var(--input)] p-2 flex-1 bg-[var(--card)] text-[var(--foreground)] rounded-lg" required />
            </div>
            <input type="email" placeholder="Email" className="border border-[var(--input)] p-2 w-full bg-[var(--card)] text-[var(--foreground)] rounded-lg" required />
            <textarea placeholder="Your Message" className="border border-[var(--input)] p-2 w-full h-24 bg-[var(--card)] text-[var(--foreground)] rounded-lg" required></textarea>
            <button type="submit" className={`px-4 py-2 flex items-center hover:scale-110 justify-center gap-2 bg-[#4A90E2] text-[var(--primary-foreground)] rounded-lg transition duration-300  ${isSubmitted ? "bg-[#357ABD]" : ""}`}>              <Send className="w-5 h-5" />
              {isSubmitted ? "Message Sent" : "Send Message"}
            </button>
          </form>

          <div className="p-6 rounded-lg transition duration-300 hover:shadow-lg">
            <div className="h-64 flex items-center justify-center rounded">
              <img src={svg} alt="Illustration" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        <div className="bg-[var(--muted)] rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Frequently Asked Questions</h2>
            <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Find quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[{
              question: "What services do you offer?",
              answer: "We offer digital services including web development, mobile apps, and marketing."
            }, {
              question: "How long does a project take?",
              answer: "Timelines vary by project scope and complexity."
            }, {
              question: "Do you offer support?",
              answer: "Yes, we offer ongoing maintenance and support packages."
            }, {
              question: "How to start working with us?",
              answer: "Fill out the contact form or give us a call to discuss your project."
            }].map((faq, index) => (
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
