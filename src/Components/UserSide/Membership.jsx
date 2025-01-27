import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Membership() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const userName = JSON.parse(localStorage.getItem("user"))?.username;
  const token = localStorage.getItem("token");
  const [membership,setMembership] = useState([])


  useEffect(()=>{

const fetchmembership = async()=>{
  try {
    const response = await axios.get('http://localhost:3000/api/users/getmembership')
    setMembership(response.data)
  } catch (error) {
    console.log("failed to fetch membership",error)
    toast.error("Membership")
    
  }
}
fetchmembership()
 },[])


  // Razorpay Payment Handler
  const handlePayment = async (membership) => {
    const loadScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const isLoaded = await loadScript();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      // Initiate order on the server
      const { data } = await axios.post(
        `http://localhost:3000/api/users/payment/${userId}`,
        { amount: membership.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_0wgyeuQHj6FA1r", // Replace with your Razorpay API Key
        amount: data.amount,
        currency: data.currency,
        name: "BOOKRED",
        description: `${membership.name} Membership`,
        image: "https://static.vecteezy.com/system/resources/previews/004/627/859/non_2x/face-of-cute-little-baby-girl-isolated-icon-free-vector.jpg.png",
        order_id: data.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Verify payment on the server
          try {
            await axios.post(
              `http://localhost:3000/api/users/memberpayment`,
              paymentData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`${membership.name} Membership activated!`);
            navigate("/");
          } catch (err) {
            toast.error("Payment verification failed");
            console.error(err);
          }
        },
        prefill: { name: userName, email: "user@example.com", contact: "1234567890" },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Please Login");
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Navbar2 />
      <div className="bg-gray-50 min-h-screen py-10 px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Choose Your Membership Plan
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {membership.map((membership, index) => (
            <div
              key={index}
              className={`${membership.bgColor} p-8 rounded-2xl shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                {membership.name}
              </h2>
              <p className="text-center text-2xl font-bold text-gray-900 mb-8">
                ₹{membership.price}/month
              </p>

              <ul className="mb-8 space-y-4">
                {membership.features.map((feature, i) => (
                  <li key={i} className="text-gray-700 text-lg flex items-center">
                    <span className="mr-3 text-green-600">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(membership)}
                className="w-full bg-sky-950 text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-400"
              >
                Choose {membership.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Membership;

