import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/reviews");
        setReviews(response.data || []);
      } catch (error) {
        console.log("Failed to load reviews", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">User Reviews</h1>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews available.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">User ID:</span>{" "}
                    {review.userId}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Posted Date:</span>{" "}
                    {new Date(Number(review.postedDate)).toLocaleString()}
                  </p>
                  {/* Uncomment if you have a `content` field */}
                  <p className="mt-2 text-gray-700">
                    <span className="font-semibold">Content:</span>   An engaging tale that kept me hooked from the first page to the last!
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
