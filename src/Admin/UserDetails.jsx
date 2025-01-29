import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import { toast } from 'sonner';

function UserDetails() {
    const {userid} = useParams();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const [borrows,setBorrows] = useState([]);
    const userss = JSON.parse(localStorage.getItem('user'));
    const userId = userss?._id;
    
    


    useEffect(()=>{
        const fetchUserdetails = async()=>{
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/user/${userid}`);
                setUser(response.data)
                
            } catch (error) {
                console.log("err",error)
                
            }finally{
                setLoading(false)
            }
           
        }
        fetchUserdetails()
    },[userid])

    useEffect(()=>{
      const fetchBorrows = async()=>{
        try {
          const response = await axios.get(`http://localhost:3000/api/users/borrow/${userId}`)
           setBorrows(response?.data.borrows)
        } catch (error) {
         console.log("failed to fetch borrows",error)
         toast.error("Failed to load borrows")
          
        }
      }
      fetchBorrows();
    },[userId])
    

    if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;


  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">User Details</h1>

            <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white">
  {/* User Image */}
  <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg">
    <img
      src={userss.image || '/default-avatar.png'}
      alt="User Avatar"
      className="w-full h-full object-cover"
    />
  </div>

  {/* User Details */}
  <div className="text-center mt-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
    <p className="text-sm text-gray-600 italic mb-4">{user.email}</p>
    <div className="bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full px-4 py-1 inline-block">
      Membership Status: Active
    </div>
  </div>

  {/* Stats */}
  <div className="mt-6 grid grid-cols-2 gap-4 text-center">
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p className="text-lg font-bold text-gray-800">{borrows?.length}</p>
      <p className="text-sm text-gray-600">Total Borrows</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <p className="text-lg font-bold text-gray-800">Active</p>
      <p className="text-sm text-gray-600">Membership</p>
    </div>
  </div>
</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDetails
