import React from 'react';


function HomePage() {
  return (
    <div className="bg-gray-50">
      

      {/* Banner Section */}
      {/* <div className="p-2">
        <img
          src="https://oxfordbookstore.com/public/uploads/home_images/1733471746_0.jpg"
          alt="home-banner"
          className="w-full rounded-lg shadow-lg"
        />
      </div> */}
      {/* Blog Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Our Latest Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                {/* <img
                  src={`https://source.unsplash.com/300x200/?books,reading,${index}`}
                  alt={`Blog ${index}`}
                  className="w-full rounded-lg mb-4"
                /> */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Blog Title {index + 1}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover the world of literature with our insightful articles.
                  Explore tips, recommendations, and more to fuel your reading
                  journey.
                </p>
                <button className="mt-4 bg-sky-950 text-white px-4 py-2 rounded-lg hover:bg-sky-800 transition">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            What Our Readers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <img
                  src={`https://source.unsplash.com/100x100/?portrait,person,${index}`}
                  alt={`Person ${index}`}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                  Person {index + 1}
                </h3>
                <p className="text-center text-gray-700">
                  "This bookstore has been my go-to place for books! The
                  collection is outstanding, and the staff is super friendly."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
