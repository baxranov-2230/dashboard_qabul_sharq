import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation, useNavigate, Navigate, Link,
} from "react-router-dom";
import {Menu as MenuIcon, Bell} from "lucide-react";
import {jwtDecode} from "jwt-decode";

import {Toaster} from "react-hot-toast";


import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import {IoIosPerson} from "react-icons/io";
import {LuLogOut} from "react-icons/lu";
import HemisLogo from "./components/HemisLogo";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage.jsx";
import {useQuery} from "@tanstack/react-query";



import ListEducationType from "./pages/EducationTypePages/ListEducationType.jsx";
import ListStudyDirection from "./pages/ListStudyDirection.jsx";
import ListUserApplication from "./pages/ListUserApplication.jsx";
import ListStudyForm from "./pages/ListStudyForm.jsx";


function ProtectedRoute({children}) {
    const token = JSON.parse(localStorage.getItem("token"));
    const location = useLocation();
    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
    return children;
}

function App() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation(); // Get current route location
    const isLoginPage = location.pathname === "/login" || location.pathname === "/";
    const isRegisterPage = location.pathname === "/register";
    const isVerifySMSPage = location.pathname === "/verify-sms";
    const isPassportPage = location.pathname === "/passport";
    const isForgetPassword = location.pathname === "/forget-password";
    const isResetPassword = location.pathname === "/reset-password";
    const [userRole, setUserRole] = useState("");

    const isPublicPage = !(isLoginPage || isRegisterPage || isVerifySMSPage || isPassportPage || isForgetPassword || isResetPassword);

    // const {data: application, isLoading, error} = useQuery({
    //     queryKey: ["chek-application"],
    //     queryFn: GetApplicationApi,
    // });
    // const isDisabled = !!application || isLoading;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role);
        } else {
            setUserRole(null);
        }
    }, [localStorage.getItem("token")]);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        localStorage.removeItem("token");
        return <Navigate to="/login" state={{from: location}} replace/>;
    };
    return (
        <div className="min-h-screen bg-[#F5F5F9] ">
            <div
                className={` ${isPublicPage ? "pt-8" : ""}`}>
                {isPublicPage &&
                    <Sidebar isOpen={isSidebarOpen}/>}
                <header className={`bg-white px-6 mx-6 transition-all duration-300  text-black sticky top-0   z-10 ${
                    isPublicPage && isSidebarOpen
                        ? "sm:ml-72"
                        : isPublicPage
                            ? "sm:ml-28"
                            : "hidden"
                }`}
                >

                    <div className="w flex  items-center justify-between  h-16">
                        <div className="flex items-center space-x-4">
                            <MenuIcon
                                className="h-6 w-6 cursor-pointer"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            />
                            <HemisLogo className="h-8"/>
                        </div>
                        <div className="flex items-center space-x-6 mr-10">

                            <Bell className="h-5 w-5 cursor-pointer"/>
                            <div>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? "fade-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <div className="flex items-center space-x-3 text-black">
                                        <div
                                            className="h-8 w-8 rounded-full bg-[#E7E7FF] flex items-center justify-center">
                                            <span className="text-sm font-medium">JS</span>
                                        </div>
                                    </div>
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <IoIosPerson
                                            className="mr-2 text-2xl text-white bg-amber-300 rounded-full p-1"/> <Link
                                        to="/profile">Profile</Link>
                                    </MenuItem>
                                    {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                    <MenuItem
                                        onClick={() => {
                                            handleLogout();
                                            handleClose();
                                        }}
                                    >
                                        <LuLogOut
                                            className="mr-2 font-bold text-white text-2xl bg-red-500 rounded-full p-1"/> Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>

                </header>
                <main
                    className={` p-6  transition-all duration-300 ${
                        isPublicPage && isSidebarOpen
                            ? "sm:ml-64"
                            : isPublicPage
                                ? "sm:ml-20"
                                : ""
                    }`}
                >

                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>


                        <Route path="/dashboard" element={<Dashboard/>}/>


                        <Route
                            path="/education-type"

                            element={
                                <ProtectedRoute>
                                    <ListEducationType/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/study-direction"

                            element={
                                <ProtectedRoute>
                                    <ListStudyDirection/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/list-application"

                            element={
                                <ProtectedRoute>
                                    <ListUserApplication/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/list-study-form"

                            element={
                                <ProtectedRoute>
                                    <ListStudyForm/>
                                </ProtectedRoute>
                            }
                        />
                        {/*<Route*/}
                        {/*    path="/list-application"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <ListApplication/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/create-application"*/}
                        {/*    element={*/}
                        {/*        <ProtectedRoute>*/}
                        {/*            <CreateApplication/>*/}
                        {/*        </ProtectedRoute>*/}
                        {/*    }*/}
                        {/*/>*/}

                        <Route path="*" element={<div>404 - Sahifa topilmadi</div>}/>


                    </Routes>
                    <Toaster/>
                </main>
            </div>
        </div>
    );
}

export default App;