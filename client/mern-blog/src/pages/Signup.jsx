import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../lib/api";
import { Button } from "@/components/ui/button";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
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
  const result = await signup(formData);
  console.log("Signup success:", result);
  navigate("/login");
} catch (err) {
  console.error("Signup error:", err);
  setError(err.response?.data?.message || "Signup failed.");
setLoading(false)
}}
  return (
    <div className="max-w-75 mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
  }