import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import { toast } from 'sonner';

function Profile() {
    const [borrows, setBorrows] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    useEffect(() => {
        const fetchBorrows = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/borrow/${userId}`);
                setBorrows(response.data);
            } catch (error) {
                console.error("Failed to fetch borrows", error);
                toast.error("Failed to load borrows");
            }
        };
        fetchBorrows();
    }, [userId]);

    return (
        <main className="flex-1 bg-gray-100">
            <Navbar />
            <Navbar2 />
            <div className="flex flex-col items-center mt-8">
                {/* Profile Card */}
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full mx-4 md:mx-auto">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500">
                            <img
                                src={user.image || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {user.username || "John Doe"}
                            </h1>
                            <p className="text-lg text-gray-600 mb-1">
                                <strong>Email:</strong> {user.email || "user@example.com"}
                            </p>
                            <p className="text-lg text-gray-600 mb-1">
                                <strong>User ID:</strong> {userId || "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="bg-blue-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-blue-600 transition">
                            Edit Profile
                        </button>
                        <button className="bg-red-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-red-600 transition">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Borrowed Items */}
                <div className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-4xl w-full mx-4 md:mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Borrowed Items</h2>
                    {borrows.length > 0 ? (
                        <ul className="space-y-4">
                            {borrows.map((borrow, index) => (
                                <li
                                    key={borrow._id || index}
                                    className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {borrow.productName || "Product Name"}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            <strong>Borrow Date:</strong>{" "}
                                            {new Date(borrow.borrowDate).toLocaleDateString() || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <strong>Status:</strong> {borrow.status || "N/A"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                            ₹{borrow.totalPrice || "0.00"}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No borrowed items found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default Profile;
