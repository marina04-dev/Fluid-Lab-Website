// src/pages/admin/Login.jsx - FIXED VERSION
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import toast from "react-hot-toast";

const Login = () => {
  // get necessary variables/functions from AuthContext
  const { user, login, loading, error, clearError } = useAuth();
  // use the path location
  const location = useLocation();
  // state variables to handle form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // state variables to handle login loading
  const [loginLoading, setLoginLoading] = useState(false);

  // toast notifications if an error occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  // ✅ CONDITIONAL LOGIC AFTER ALL HOOKS
  const from = location.state?.from?.pathname || "/admin";

  // ✅ CONDITIONAL RETURNS AFTER ALL HOOKS
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ✅ ANOTHER CONDITIONAL RETURN - STILL AFTER ALL HOOKS
  if (user) {
    return <Navigate to={from} replace />;
  }

  // function to handle inputs changes
  const handleChange = (e) => {
    // get the name and the value from the event
    const { name, value } = e.target;
    // provide the data in the setter function
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function to handle form submission
  const handleSubmit = async (e) => {
    // prevent default browser's behaviour from reloading the page
    e.preventDefault();
    // begin to load login
    setLoginLoading(true);

    try {
      // make the api call to login
      const result = await login(formData.email, formData.password);
      // check response's status
      if (result.success) {
        toast.success("Login successful!");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      // terminate the login loading
      setLoginLoading(false);
    }
  };

  // ✅ MAIN RENDER RETURN AT THE END
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">FL</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@fluidlab.com"
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <Button type="submit" loading={loginLoading} className="w-full">
              Sign in
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Demo Credentials:
            </h3>
            <p className="text-sm text-gray-600">
              Email: admin@fluidlab.com
              <br />
              Password: admin123456
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
