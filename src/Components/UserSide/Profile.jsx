import React from 'react';
import Navbar from './Navbar';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Profile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        toast.success('Logout Successfully');
    };

    return (
        <main className="flex-1 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
            <Navbar />
            <Navbar2 />
            <div className="flex flex-col items-center py-12">
                {/* Profile Card */}
                <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-4xl w-full mx-4 md:mx-auto transform hover:scale-105 transition duration-300">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-sky-800">
                            <img
                                src={user.image || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white h-6 w-6 rounded-full"></span>
                        </div>
                        {/* User Info */}
                        <div className="flex-1 mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                                {user.username || 'John Doe'}
                            </h1>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Email:</strong> {user.email || 'user@example.com'}
                            </p>
                            <p className="text-lg text-gray-600">
                              <h2>Membership Status :</h2>
                            </p>
                            
                            <p className="text-lg text-gray-600">
                              <h2>Total Borrows :</h2>
                            </p>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col md:flex-row justify-between gap-4">
                        <button className="flex-1 bg-gradient-to-r from-sky-950 to-sky-600 text-white py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-sky-700 transform hover:scale-105 transition duration-300">
                            Edit Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 bg-gradient-to-r from-sky-950 to-red-600 text-white py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-red-700 transform hover:scale-105 transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default Profile;

