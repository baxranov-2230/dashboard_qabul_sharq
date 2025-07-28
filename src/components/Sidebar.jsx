import React, {useEffect, useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {RiFolderAddLine} from "react-icons/ri";
import {CiViewList} from "react-icons/ci";
import { PiListChecksFill } from "react-icons/pi";
import logo from "../assets/images/logo_sharq.png";
import {IoIosPerson} from "react-icons/io";
import {
    Home,
    ChevronRight,
    ChevronDown,
} from "lucide-react";
import { MdLanguage } from "react-icons/md";
import {FaList} from "react-icons/fa6";
import {LuNotebookText} from "react-icons/lu";
import {MdOutlinePostAdd} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import {jwtDecode} from "jwt-decode";
import { BsBuildingX } from "react-icons/bs";
import { RiGraduationCapFill } from "react-icons/ri";
import { RiUserReceived2Fill } from "react-icons/ri";

function Sidebar({isOpen}) {
    const location = useLocation();
    const [expandedCategories, setExpandedCategories] = useState(["/"]);
    const token = JSON.parse(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserRole(decoded?.role);
        } else {
            setUserRole(null);
        }
    }, [localStorage.getItem("token")]);
    const toggleCategory = (category) => {
        setExpandedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };
    let menuCategories;
    // if (userRole === "admin") {
        menuCategories = [
            // {
            //     id: "main",
            //     items: [{icon: Home, label: "Bosh sahifa", path: "/admin"}],
            // },
            {
                id: "education_type",
                items: [
                    {icon: BsBuildingX , label: "Bitirgan ta'lim turi", path: "/education-type"},
                ],
            },
            {
                id: "study_direction",
                items: [
                    {icon: RiGraduationCapFill  , label: "Ta'lim yo'nalishlari", path: "/study-direction"},
                ],
            },
            {
                id: "list_application",
                items: [
                    {icon: RiUserReceived2Fill , label: "Kelgan arizalar", path: "/list-application"},
                ],
            },
            {
                id: "list_study_form",
                items: [
                    {icon: PiListChecksFill , label: "Ta'lim shakli", path: "/list-study-form"},
                ],
            },

    //         {
    //             id: "no_list",
    //             items: [
    //                 {icon: FaList, label: "Rad bo'lgan ", path: "/no-list-application"},
    //             ],
    //         },
    //     ];
    // } else if (userRole === "student") {
    //     menuCategories = [
    //         {
    //             id: "application",
    //             items: [{icon: MdOutlinePostAdd, label: "Arizalar", path: "/application"}],
    //         },
    //         {
    //             id: "rating",
    //             items: [{icon: LuNotebookText, label: "Reyting daftarcha", path: "/rating"}],
    //         },
    //         {
    //             id: "profile",
    //             items: [{icon: CgProfile, label: "Profil", path: "/profile"}],
    //         },
        ];
    // }


    return (
        <aside
            className={`fixed bottom-0 w-full h-[calc(10vh)] sm:left-0 sm:top-0 sm:h-[calc(100vh)] bg-white shadow-lg transition-all duration-300 ${
                isOpen ? "sm:w-64" : "sm:w-20"
            } z-10 overflow-y-auto`}
        >
            <nav className="p-4 flex sm:flex-col">
                <div className="hidden sm:flex sm:items-center sm:justify-center pb-4  px-16 border-b-2">
                    <img src={logo} alt=""/>
                </div>
                {menuCategories?.map((category) => (
                    <div key={category.id} className="my-1">
                        {category.title && isOpen && (
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-500"
                            >
                                {category.title}
                                {expandedCategories.includes(category.id) ? (
                                    <ChevronDown className="h-4 w-4"/>
                                ) : (
                                    <ChevronRight className="h-4 w-4"/>
                                )}
                            </button>
                        )}
                        <ul
                            className={`space-y-1 ${
                                category.title &&
                                !expandedCategories.includes(category.id) &&
                                isOpen
                                    ? "hidden"
                                    : ""
                            }`}
                        >
                            {category.items.map((item, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={({isActive}) => `
                      flex items-center p-3 rounded-lg  transition-all duration-300
                      ${
                                            isActive
                                                ? "bg-[#E7E7FF] text-[#696CFF] font-semibold"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }
                    `}
                                    >
                                        <item.icon
                                            className={`h-5 w-5 ${
                                                location.pathname === item.path
                                                    ? "text-[#2557A7]"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                        <span className={`ml-3 ${!isOpen ? "hidden" : ""}`}>
                      {item.label}
                    </span>
                                        {location.pathname === item.path && isOpen && (
                                            <ChevronRight className="ml-auto h-4 w-4 text-[#2557A7]"/>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
