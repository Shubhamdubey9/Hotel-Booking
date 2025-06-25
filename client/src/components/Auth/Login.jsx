//

// src/components/Auth/Login.jsx
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import NavBar from "../NavBar";
import { useAppContext } from "@/context/useAppContext";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const dispatch = useDispatch();
  const { navigate, loading } = useAppContext();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        const userWithToken = {
          ...res.data.user,
          token: res.data.token,
        };
        dispatch(setUser(userWithToken));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="flex items-center justify-center py-10 px-4 mt-30">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-md rounded-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={input.email}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={input.password}
              onChange={changeEventHandler}
              required
            />
          </div>

          <div className="mb-4">
            <Label className="block mb-2">Role</Label>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="user"
                  checked={input.role === "user"}
                  onChange={changeEventHandler}
                  id="user"
                />
                <Label htmlFor="user">User</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="hotelOwner"
                  checked={input.role === "hotelOwner"}
                  onChange={changeEventHandler}
                  id="hotelOwner"
                />
                <Label htmlFor="hotelOwner">hotelOwner</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
