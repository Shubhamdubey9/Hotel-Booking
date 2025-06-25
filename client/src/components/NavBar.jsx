import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { logout } from "@/Redux/AuthSlice";
import { toast } from "sonner";
import { Hotel, LogOut, User2 } from "lucide-react";
import { useAppContext } from "@/context/useAppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
        />
      </Link>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}
        {user && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
          >
            {isOwner ? "Dashboard" : "List of Your Hotel"}
          </button>
        )}
      </div>
      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt=""
          className={`${
            isScrolled && "invert"
          } h-7 transition-all duration-500`}
        />
        {!user ? (
          <>
            <Button
              variant="outline"
              className={isScrolled ? "text-black" : " border-white bg-none"}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-black text-white"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="w-11 h-11 rounded-full"
                  src={user?.profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60 rounded-md border border-x-2 px-3 mt-4 shadow-lg gap-4">
              <div className="mx-auto rounded-md">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="w-11 h-11 rounded-full mt-2"
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-600  ">
                <div className="flex items-center gap-4">
                  <Hotel />
                  <button
                    variant="ghost"
                    className="font-bold text-xl "
                    onClick={() => navigate("/my-booking")}
                  >
                    My Booking
                  </button>
                </div>
                <div className="flex w-fit items-center gap-1 cursor-pointer">
                  <User2 />
                  <Button variant="Link" className="font-bold text-xl" onClick={() => navigate("/view-profile")}>
                    View Profile
                  </Button>
                </div>
                <div className="flex w-fit items-center gap-1 cursor-pointer">
                  <LogOut />
                  <Button
                    onClick={logOutHandler}
                    variant="Link"
                    className="font-bold text-xl"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      {/* Mobile Menu Button  */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="w-11 h-11 rounded-full "
                  src={user?.profile?.profilePhoto}
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-60 rounded-md border border-x-2 px-3 mt-4 shadow-lg gap-4">
              <div className="mx-auto rounded-md">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="w-11 h-11 rounded-full mt-2"
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">Hello Shubham</h4>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Hotel />
                  <button
                    variant="ghost"
                    className="invert "
                    onClick={() => navigate("/my-booking")}
                  >
                    My Booking
                  </button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2 />
                  <Button variant="Link" className="font-bold text-xl">
                    <Link to="/profile"> View Profile</Link>
                  </Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button
                    onClick={logOutHandler}
                    variant="Link"
                    className="font-bold text-xl"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <img
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        src={assets.menuIcon}
        alt=""
        className={`${isScrolled && "invert"} h-4 md:hidden`}
      />

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
          >
            {isOwner ? "Dashboard" : "List of Your Hotel"}
          </button>
        )}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../assets/logo.svg";
// import { assets } from "../assets/assets";
// import { useSelector } from "react-redux";
// import { Button } from "./ui/button";

// const BookIcon = () => (
//   <svg
//     className="w-4 h-4 text-gray-700"
//     aria-hidden="true"
//     viewBox="0 0 24 24"
//     fill="none"
//   >
//     <path
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
//     />
//   </svg>
// );

// const NavBar = () => {
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Hotels", path: "/rooms" },
//     { name: "Experience", path: "/" },
//     { name: "About", path: "/" },
//   ];

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // ✅ Get user from Redux
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (location.pathname !== "/") {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }

//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location.pathname]);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
//         isScrolled
//           ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
//           : "py-4 md:py-6"
//       }`}
//     >
//       {/* Logo */}
//       <Link to="/">
//         <img
//           src={logo}
//           alt="logo"
//           className={`h-9 ${isScrolled && "invert opacity-80"}`}
//         />
//       </Link>

//       {/* Desktop Nav */}
//       <div className="hidden md:flex items-center gap-4 lg:gap-8">
//         {navLinks.map((link, i) => (
//           <Link
//             key={i}
//             to={link.path}
//             className={`group flex flex-col gap-0.5 ${
//               isScrolled ? "text-gray-700" : "text-white"
//             }`}
//           >
//             {link.name}
//             <div
//               className={`${
//                 isScrolled ? "bg-gray-700" : "bg-white"
//               } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
//             />
//           </Link>
//         ))}

//         {/* Auth Buttons */}
//         {!user ? (
//           <>
//             <Button
//               variant="outline"
//               className={isScrolled ? "text-black" : "text-white border-white inert:"}
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Button>
//             <Button
//               className="bg-black text-white"
//               onClick={() => navigate("/signup")}
//             >
//               Signup
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button variant="ghost" onClick={() => navigate("/my-booking")}>
//               My Booking
//             </Button>
//             <Button
//               variant="outline"
//               className={isScrolled ? "text-black" : "text-white border-white"}
//               onClick={() => navigate("/owner")}
//             >
//               Dashboard
//             </Button>
//           </>
//         )}
//       </div>

//       {/* Search Icon */}
//       <div className="hidden md:flex items-center gap-4">
//         <img
//           src={assets.searchIcon}
//           alt=""
//           className={`${
//             isScrolled && "invert"
//           } h-7 transition-all duration-500`}
//         />
//       </div>
//     </nav>
//   );
// };
// export default NavBar;
