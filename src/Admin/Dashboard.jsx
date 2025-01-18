import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [reviews, setReviews] = useState([]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/viewallusers");
        setUsers(response?.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/products");
        setProducts(response.data.data);
      } catch (error) {
        console.log("failed to load products", error);
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/viewAllmembers");
        setMembers(response.data);
      } catch (error) {
        console.log("failed to load members", error);
        toast.error("Failed to load members");
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/viewAllborrows");
        setBorrows(response.data);
      } catch (error) {
        console.log("Failed to load borrows", error);
        toast.error("Failed to load borrows");
      }
    };
    fetchBorrows();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/reviews");
        setReviews(response.data);
      } catch (error) {
        console.log("Failed to load Reviews", error);
      }
    };
    fetchReviews();
  }, []);

  const data = [
    { name: "Users", value: users.length },
    { name: "Products", value: products.length },
    { name: "Members", value: members.length },
    { name: "Borrows", value: borrows.length },
    { name: "Reviews", value: reviews.length },
  ];

  return (
    <div>
      <AdminNavbar />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 p-6">
          <header className="mb-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dashboard</h2>
          </header>
          <section className="flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Data Overview
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

