import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'sonner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';

const signupValidation = yup.object({
  email: yup.string().email("Please enter a valid email").required("Please enter email"),
  password: yup.string().min(5).required("Please enter password"),
});

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  let navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          const { token, user } = response.data;

          console.log(user, "userjhhhj");

          // Save token and user _id to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userId', user._id); // Store only the _id
          localStorage.setItem('username', user.username);
          localStorage.setItem('image', user.image);

          navigate('/');
          toast.success('Login completed successfully');
        }
      } catch (error) {
        toast.error("Invalid email or password");
        console.log(error);
      }
    },
  });

  // Handle Google Login Success
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse; // Google JWT token

      // Send the token to your backend for authentication
      const response = await axios.post("http://localhost:3000/api/users/googlelogin", {
        idToken: credential,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save token and user data to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user._id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('image', user.image);

        navigate('/');
        toast.success('Google login completed successfully');
      }
    } catch (error) {
      toast.error("Google login failed");
      console.error(error);
    }
  };

  // Handle Google Login Error
  const handleGoogleLoginError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/top-view-floral-bookmark-book_23-2149894345.jpg')" }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember Me</label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-950 text-white py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center">
          <GoogleLogin
  onSuccess={(credentialResponse) => handleGoogleLoginSuccess(credentialResponse)}
  onError={() => handleGoogleLoginError()}
/>

          </div>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-red-800 cursor-pointer font-semibold"
              onClick={() => navigate('/Register')}
            >
              Sign Up
            </span>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-4 bg-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <p className="mt-4">
              <Link to="/adminlogin" className="flex items-center justify-center text-gray-400 hover:text-white">
                Admin Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
