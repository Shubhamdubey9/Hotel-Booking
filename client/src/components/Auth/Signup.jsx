import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "../ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/AuthSlice";
import { Loader2 } from "lucide-react";
import NavBar from "../NavBar";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
    file: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex items-center justify-center px-4 py-10 mt-30">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

          <div className="mb-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Enter your name"
              value={input.fullname}
              onChange={changeEventHandler}
              required
            />
          </div>

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
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={input.phoneNumber}
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
                  id="student"
                />
                <Label htmlFor="student">User</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="hotelOwner"
                  checked={input.role === "hotelOwner"}
                  onChange={changeEventHandler}
                  id="recruiter"
                />
                <Label htmlFor="recruiter">hotelOwner</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="mb-6">
            <Label htmlFor="file" className="block mb-2">
              Upload Profile
            </Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
        
           <Button type="submit" className="w-full mt-4" disabled={loading}>
                     {loading ? (
                       <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Signing in...
                       </>
                     ) : (
                       "Signin"
                     )}
                   </Button>
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
