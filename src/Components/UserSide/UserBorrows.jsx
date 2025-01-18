import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function UserBorrows() {
    const [borrows, setBorrow] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchBorrow = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/borrow/${userId}`);
                setBorrow(response?.data?.borrow || []);
            } catch (error) {
                console.error('Failed to load borrows:', error);
                toast.error('Failed to fetch Borrow');
            }
        };
        fetchBorrow();
    }, [userId]);

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="container mx-auto mt-8 px-4">
                {borrows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-100 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-700">
                            No Borrows Found
                        </h2>
                        <p className="text-gray-600 text-center">
                            You currently have no borrowed items. Take membership to enjoy access to our collection and start borrowing today!
                        </p>
                        <button
                            onClick={() =>navigate('/membership')}
                            className="bg-sky-950 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-800 transition ">
                            Take Membership
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {borrows.map((borrow, index) => (
                            <div key={borrow._id} className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                    Borrow #{index + 1}
                                </h2>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">Product:</h3>
                                    <ul className="space-y-3">
                                        {borrow?.productId?.map((product) => (
                                            <li
                                                key={product?._id}
                                                className="flex items-start gap-4 border-b border-gray-200 pb-2">
                                                <img
                                                    src={product?.image}
                                                    alt={product?.name}
                                                    className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                                />
                                                <div>
                                                    <p className="text-gray-700 font-medium">{product?.name}</p>
                                                    <h2 className="text-gray-500">
                                                        Price: ${product?.price}, Category: {product?.category}
                                                    </h2>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                                        Total Price: $200
                                    </h3>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">Start Date:</h3>
                                    <p className="text-gray-700">
                                        {borrow.startDate}, {borrow.city}, {borrow.state} {borrow.zipcode}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserBorrows;
