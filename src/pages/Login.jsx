import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverURL = process.env.REACT_APP_SERVER_URL;

    const res = await axios.post(`${serverURL}/user/login`, formData);
    if (res.data.status === 400) {
      alert(res.data.message);
    } else if (res.data.status === 200) {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("name", res.data.dbUsername);

      alert("Succesfully Logged In");
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-200"
        >
          <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-violet-500 to-pink-500 text-transparent bg-clip-text">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300 transition shadow-sm"
              />
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full py-3 text-white text-lg font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md"
              >
                🔐 Login
              </button>
            </motion.div>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            New here?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-semibold"
            >
              Register Now!
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}