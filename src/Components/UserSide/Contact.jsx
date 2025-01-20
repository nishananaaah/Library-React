import React from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";

function Contact() {
  return (
    <div>
      {/* Main Navigation */}
      <Navbar />
      <Navbar2 />

      {/* Contact Section */}
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-sky-950 text-center mb-6">
            Contact Us
          </h1>
          <p className="text-center text-gray-700 text-lg mb-10 p-0">
            We’d love to hear from you! Whether you have questions, feedback, or need help, reach out to us anytime.
          </p>

          {/* Content */}
          <div className="flex flex-wrap -mx-6">
            {/* Contact Details */}
            <div className="w-full md:w-1/2 px-6 mb-10 md:mb-0">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Have any questions about borrowing books or using the platform? Feel free to get in touch with us through the form or by using the details below.
              </p>
              <ul className="text-gray-600 space-y-4">
                <li>
                  <strong>Email:</strong> support@bookborrow.com
                </li>
                <li>
                  <strong>Phone:</strong> +1 (123) 456-7890
                </li>
                <li>
                  <strong>Address:</strong> 123 Library Lane, Booktown, BK 56789
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="w-full md:w-1/2 px-6">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 p-1">
                Send Us a Message
              </h2>
              <form className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Type your message here"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

