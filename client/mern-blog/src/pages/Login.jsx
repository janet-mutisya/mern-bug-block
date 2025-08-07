
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../lib/api";
import {Button} from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(formData);
      console.log("Login response:", res);

      // Fixed: Access token and user directly from res (not res.data)
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      
      // Fixed: Use navigate instead of window.location.href
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-75 mx-auto mt-10 mb-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button
          disabled={loading}
          variant="secondary"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-900">
          Sign up here
        </Link>
      </p>
    </div>
  );
}
