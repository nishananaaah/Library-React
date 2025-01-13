import  { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Sidebar from './Sidebar'
import axios from "axios";


function Members() {
    const [members,setMembers] = useState([]);
   

    useEffect(()=>{
        const fetchMembers = async()=>{
            try {
              const response = await axios.get('http://localhost:3000/api/admin/viewAllmembers')  
                setMembers(response?.data)
            } catch (error) {
                console.log("Filed to fetch members",error);
               
         }

        }
        fetchMembers();
      
    },[])


    return (
        <div className="min-h-screen bg-gray-100">
          <AdminNavbar/>
          <div className="flex">
           <Sidebar/>
            <div className="flex-1 p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Member Management
              </h1>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                          UserID
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                          Total Price 
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase">
                          Start Date
                        </th>

                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {members.length > 0 ? (
                        members.map((member) => (
                          <tr
                            key={member._id} 
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {member.userId}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {/* {member.totalPrice} */} 200
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {member.startDate}
                            </td>
    
                            <td className="px-6 py-4 text-sm text-gray-900">
                            
                            </td>
                          </tr>
                        
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
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
            </div>
          </div>
        </div>
      );
}

export default Members
