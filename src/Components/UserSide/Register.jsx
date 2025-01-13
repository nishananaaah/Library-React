import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

// Validation schema
const signupValidation = yup.object({
  username: yup.string().min(3).required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().min(5).required("Please enter a password"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not match")
    .required("Please confirm your password"),
});

// Initial form values
const initialValues = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
  image:null,
};



const Register = () => {
  const [profileimage, setProfile] = useState(null);
  let navigate = useNavigate();

  const {setFieldValue, values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signupValidation,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.image) {
          formData.append("image",values.image);
        }
        
        console.log(formData,'hipooooo')

        try {
          const response = await axios.post(
            "http://localhost:3000/api/users/register",formData,
            
{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(response.data.message, "success");
          navigate("/Login");
        } catch (error) {
          toast.error(error.response.data.message, "error");
        }
      },
    });
    
  const handleImageChange = (e) => {
    const file=e.target.files[0]
    console.log(file);
    setFieldValue("image",file);
    setProfile(file)
  };

  return (
    <div
      className="flex justify-center bg-red-300 min-h-screen py-12 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/top-view-bookmark-books-arrangement_23-2149894398.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-60 w-full max-w-4xl p-4 rounded-lg shadow-xl flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-6">
        {/* Left Section */}
        <div className="sm:w-1/2 text-white space-y-4">
          <h3 className=" flex text-4xl font-semibold justify-center">Welcome!</h3>
          <p>
          Sign up to access our online library BOOKRED and explore features like book tracking, borrowing history, and personalized recommendations tailored just for you.

          </p>
          <p>
            Upload your profile image to personalize your account and get started
            with ease.
          </p>
        </div>
  
        {/* Form Section */}
        <div className="sm:w-1/2 bg-white bg-opacity-80 p-6 rounded-lg space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300"
                />
                {touched.username && errors.username && (
                  <small className="text-red-500">{errors.username}</small>
                )}
              </div>
  
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300"
                />
                {touched.email && errors.email && (
                  <small className="text-red-500">{errors.email}</small>
                )}
              </div>
  
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300"
                />
                {touched.password && errors.password && (
                  <small className="text-red-500">{errors.password}</small>
                )}
              </div>
  
              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={values.cpassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-red-300 focus:border-red-300"
                />
                {touched.cpassword && errors.cpassword && (
                  <small className="text-red-500">{errors.cpassword}</small>
                )}
              </div>
  
              {/* Profile Image Upload */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                />
                {profileimage && (
                  <div className="mt-4 text-center">
                    <img
                      src={URL.createObjectURL(profileimage)}
                      alt="Profile preview"
                      className="w-24 h-24 rounded-full object-cover mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-amber-800 text-white py-3 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default Register;
