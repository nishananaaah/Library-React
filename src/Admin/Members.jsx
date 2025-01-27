import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import axios from 'axios';

function Members() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(5); // Number of members per page

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/viewAllmembers');
        setMembers(response?.data);
      } catch (error) {
        console.log('Failed to fetch members', error);
      }
    };
    fetchMembers();
  }, []);

  // Calculate the current members to display
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const totalPages = Math.ceil(members.length / membersPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Member Management</h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      User Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Total Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      Start Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                      End Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMembers.length > 0 ? (
                    currentMembers.map((member) => (
                      <tr
                        key={member._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {member.userId.map((user) => (
                            <div key={user._id} className="mb-2">
                              {/* <p>
                                <strong>Name:</strong> {user.name}
                              </p> */}
                              <p>
                                <strong>Email:</strong> {user.email}
                              </p>
                              {/* <p>
                                <strong>Role:</strong> {user.role}
                              </p> */}
                            </div>
                          ))}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {member.totalPrice}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(member.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(member.endStart).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No Members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === pageNumber
                    ? 'bg-sky-950 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Members;

