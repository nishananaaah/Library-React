import { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { toast } from 'sonner';
import Sidebar from './Sidebar';




function Dashboard() {
const [products,setProducts]=useState([]);
const [users,setUsers] = useState([]);
const [members,setMembers] =useState([]);
const [borrows,setBorrows] = useState([]);
const [reviews,setReviews] =useState([]);

useEffect(()=>{
    const fn = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/admin/viewallusers')
            setUsers(response?.data);
       } catch (error) {
        console.log(error);
        toast.error()
            
        }
    }
    fn();
},[])

useEffect(()=>{
   
   
    const fetchProducts = async()=>{
    try {
         const response = await axios.get('http://localhost:3000/api/admin/products');
         setProducts(response.data.data)
 
         
        } catch (error) {
            console.log("failed to load products",error);
            toast.error("failed to load products")
         }
 }
 fetchProducts();

},[])

useEffect(()=>{
    const fetchMembers = async()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/admin/viewAllmembers')
              setMembers(response.data)
        } catch (error) {
            console.log("failed to load members",error)
            toast.error("failed to load members")
            
        }
    }
    fetchMembers();
},[])

useEffect(()=>{
    const fetchBorrows = async ()=>{
        try {
           const response = await axios.get('http://localhost:3000/api/admin/viewAllborrows');
             setBorrows(response.data)
        } catch (error) {
            console.log("Failed to load borrows",error);
            toast.error("Failed to load borrows")
            
        }
    }
    fetchBorrows();
},[])

useEffect(()=>{
    const fetchReviews =async()=>{
        try {
            const response = await axios.get('http://localhost:3000/api/admin/reviews');
            setReviews(response.data)
        } catch (error) {
            console.log("Failed to load Reviews",error)
            
        }
    }
    fetchReviews()
},[])


return (
    <div>
        <AdminNavbar/>
    <div className="flex h-screen bg-gray-100">
       <Sidebar/>
        {/* Main Content */}
        <div className="flex-1 p-6">
            <header className="mb-4">

                <h2 className="text-4xl font-bold text-gray-900 mb-6">Dashboard</h2>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Users</h3>
                    <p className="mt-2 text-gray-600">{users?.length}</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Products</h3>
                    <p className="mt-2 text-gray-600">{products?.length}</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Members</h3>
                    <p className="mt-2 text-gray-600">{members?.length}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Borrows</h3>
                    <p className="mt-2 text-gray-600">{borrows?.length}</p>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium">Total Reviews</h3>
                    <p className="mt-2 text-gray-600">{reviews?.length}</p>
                </div>
            </section>
        </div>
    </div>
    </div>
);
}

export default Dashboard
