import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function UserBorrows() {
    const [borrows, setBorrow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = borrows.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(borrows.length / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div>
            <Navbar />
            <Navbar2 />
            <div className="container mx-auto mt-8 px-4">
            <h1 className=" right-8 font-bold text-2xl mb-4  p-1 border-b-2 border-white border-opacity-0 hover:border-opacity-100  hover:text-gray-400 duration-200 cursor-pointer active  text-sky-950 text-center">YOUR BORROWS</h1>
                {currentItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-100 p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-700">No Borrows Found</h2>
                        <p className="text-gray-600 text-center">
                            You currently have no borrowed items. Take membership to enjoy access to our collection and start borrowing today!
                        </p>
                        <button
                            onClick={() => navigate('/membership')}
                            className="bg-sky-950 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-800 transition">
                            Take Membership
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((borrow, index) => (
                                <div
                                    key={borrow._id}
                                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                        Borrow #{(currentPage - 1) * itemsPerPage + index + 1}
                                    </h2>
                                    <div className="mb-4">
                                        <h3 className="text-base font-medium text-gray-600 mb-2">Products:</h3>
                                        <ul>
                                            {borrow?.productId?.map((product) => (
                                                <li
                                                    key={product?._id}
                                                    className="flex gap-4 items-center mb-3">
                                                    <img
                                                        src={product?.image}
                                                        alt={product?.name}
                                                        className="w-16 h-16 object-cover rounded-md border border-gray-300"
                                                    />
                                                    <div>
                                                        <p className="text-gray-800 font-medium">{product?.name}</p>
                                                        <p className="text-gray-800 font-medium">by {product?.author}</p>
                                                        <p className="text-sm text-gray-500">
                                                            ${product?.price} - {product?.category}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-base font-medium text-gray-600">
                                            Total Price: <span className="text-gray-800">$200</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-600 mb-1">
                                            Start Date:{new Date(borrow.borrowDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-base font-medium text-gray-600 mb-1">
                                            End Date:{new Date(borrow.dueDate).toLocaleDateString()}
                                        </p>
                                        {/* <p className="text-sm text-gray-700">
                                            {borrow.city}, {borrow.state}, {borrow.zipcode}
                                        </p> */}
                                         <p className="text-base font-medium text-gray-600 mb-1">
                                            Fine:${borrow.fine}
                                        </p>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === 1
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-sky-950 text-white hover:bg-sky-800'
                                }`}>
                                Previous
                            </button>
                            <span className="text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === totalPages
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-sky-950 text-white hover:bg-sky-800'
                                }`}>
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserBorrows;

