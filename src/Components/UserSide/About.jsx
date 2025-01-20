import React from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';

function About() {
  return (
    <div>
      {/* Main Navigation */}
      <Navbar />
      <Navbar2 />

      {/* About Section */}
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-sky-950 text-center mb-6">
            About Our Book Borrowing Platform
          </h1>
          <p className="text-center text-gray-700 text-lg mb-10">
            Empowering readers to explore, borrow, and share their love for books.
          </p>

          {/* Content */}
          <div className="flex flex-wrap justify-between items-center">
            {/* Text Content */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Discover Your Next Adventure
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Welcome to our book borrowing platform! Our mission is to make books accessible to
                everyone by offering a wide collection of genres, from timeless classics to
                contemporary bestsellers. Whether you're a student, an avid reader, or someone
                looking to explore new ideas, we provide a seamless way to borrow and enjoy books.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Join our community of book enthusiasts, find your next favorite read, and connect
                with others who share your passion for literature. Together, let's build a culture
                of sharing and knowledge.
              </p>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDg5NzR8MHwxfGFsbHwxfHx8fHx8fHwxNjEyNjMzOTYw&ixlib=rb-1.2.1&q=80&w=800"
                alt="Bookshelf"
                className="rounded-lg shadow-lg w-full md:w-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
