import React, {useState, useRef, useEffect} from "react";
import {Camera} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {GetPassportApi} from "../Api/UserApi.jsx";
import {useNavigate} from "react-router-dom";
// import {UserMe} from "../Api/UserApi.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function Profile() {

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const {isError, isSuccess, isLoading, data: user, error, isFetched, refetch} = useQuery({
        queryKey: ['userMe'],
        queryFn: GetPassportApi,
    })


    useEffect(() => {
        // Faqat so‘rov tugaganidan so‘ng ishga tushadi
        if (!isLoading && isFetched) {
            if (isError || !user?.first_name) {
                navigate("/passport");
            } else {
                navigate("/profile");
            }
        }
    }, [isLoading, isFetched, isError, user, navigate]);





    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Profil</h2>

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                    <div className="relative">
                        <div
                            className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
                            onClick={handleImageClick}
                        >
                            {user?.image_path ? (
                                <img
                                    src={`${API_URL}/${user?.image_path}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-gray-400">ET</span>
                            )}
                        </div>

                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            {/*{student?.full_name}*/}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">F.I.O.</p>
                                <p className="font-medium">{user?.first_name + " " + user?.last_name + " " + user?.third_name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Jinsi</p>
                                <p className="font-medium">{user?.gender}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Yashash viloyati</p>
                                <p className="font-medium">{user?.region + " " + user?.district}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Manzili</p>
                                <p className="font-medium">
                                    {user?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t">
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Shaxsiy ma'lumotlar
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Tug'ilgan sana</p>
                                <p className="font-medium">{user?.date_of_birth}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Passport</p>
                                <p className="font-medium">{user?.passport_series_number}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Passport amal qilish muddati</p>
                                <p className="font-medium">{user?.passport_expire_date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">JSHIR</p>
                                <p className="font-medium">{user?.jshshir}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="border-t">*/}
                {/*    <div className="p-6">*/}
                {/*        <h4 className="text-lg font-semibold text-gray-800 mb-4">*/}
                {/*            O'qish ma'lumotlari*/}
                {/*        </h4>*/}
                {/*        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">*/}
                {/*            <div>*/}
                {/*                <p className="text-sm text-gray-500">O'qish turi</p>*/}
                {/*                /!*<p className="font-medium">{student?.paymentForm}</p>*!/*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p className="text-sm text-gray-500">Holati</p>*/}
                {/*                <span*/}
                {/*                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">*/}
                {/*  /!*{student?.studentStatus}*!/*/}
                {/*</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">*/}
                {/*            <div>*/}
                {/*                <p className="text-sm text-gray-500">Ta'lim shakli</p>*/}
                {/*                /!*<p className="font-medium">{student?.educationForm}</p>*!/*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p className="text-sm text-gray-500">Ta'lim turi</p>*/}
                {/*                /!*<p className="font-medium">{student?.educationType}</p>*!/*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Profile;
