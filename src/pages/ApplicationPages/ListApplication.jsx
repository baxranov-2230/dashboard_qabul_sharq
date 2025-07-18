import React, {useState, forwardRef, useEffect} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";
import {FaRegEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    Slide
} from '@mui/material';
import {MdCancel} from "react-icons/md";
import {GetApplicationApi} from "../../Api/UserApi.jsx";


// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="left" ref={ref} {...props} />; // direction `right` bo‘lsa — chapdan chiqadi
// });


function ListApplication() {
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [open, setOpen] = useState(false);


    const {isError, isSuccess, isLoading, data: applications, error, refetch} = useQuery({
        queryKey: ["list-application"],
        queryFn: GetApplicationApi,
    });


    return (

        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">

                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Yuborilgan ariza</h2>
                    <table className="w-full">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">Ariza raqami</th>
                            <th className="p-3 text-gray-600">Ta'lim yunalishi</th>
                            <th className="p-3 text-gray-600 ">Ta'lim turi</th>
                            <th className="p-3 text-gray-600 ">Izoh</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{applications?.map((application, index) => {*/}
                        {applications && (
                            <tr className="border-t" key={applications?.id}>
                                <td className="p-3 ">{applications?.id}</td>
                                <td className="p-3 ">{applications?.study_direction?.name}</td>
                                <td className="p-3 ">{applications?.study_type?.name}</td>
                                <td className="p-3 "><span className="text-green-600">Arizangiz qabul qilindi.</span>
                                    <br/> Imtihon vaqti to'g'risida qabul
                                    komissiyasi tomonidan qo'shimcha ma'lumot beriladi
                                </td>

                            </tr>
                        )

                        }
                        {/*})}*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListApplication;
