// src/pages/admin/Login.jsx - FIXED VERSION
import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Card from "../../components/common/Card";
import toast from "react-hot-toast";

const Login = () => {
  // ✅ ALL HOOKS MUST BE AT THE TOP - BEFORE ANY CONDITIONAL LOGIC
  const { user, login, loading, error, clearError } = useAuth();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);

  // ✅ useEffect HOOKS ALSO AT THE TOP
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

  // ✅ EVENT HANDLERS AFTER HOOKS AND CONDITIONAL RETURNS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success("Login successful!");
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
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
