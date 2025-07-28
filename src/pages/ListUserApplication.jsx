import React, {useState} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import {FaDownload, FaRegEdit} from "react-icons/fa";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

import {
    ConfirmApplicationApi, downloadApplicationThreePdf,
    downloadApplicationTwoPdf,
    GetListUserApplicationApi
} from "../Api/ListUserApplicationApi.jsx";
import {GetListApprovedApplicationApi} from "../Api/ListApprovedApplicationApi.jsx";


function ListApplication() {
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);


    const {data: applications, refetch} = useQuery({
        queryKey: ["list-application", limit, offset],
        queryFn: () => GetListUserApplicationApi({limit, offset}),
    });

    const {data: approvedApplications,  refetch: refetchApprovedApplications} = useQuery({
        queryKey: ["approved-application"],
        queryFn: GetListApprovedApplicationApi,

    });

    const confirmMutation = useMutation({
        mutationKey: ["confirm-application"],
        mutationFn: ConfirmApplicationApi,
        onSuccess: (data) => {
            toast.success(data.message || "Muvaffaqiyatli tasdiqlandi");
            setOpen(false);
            formik.resetForm();
            refetch();
            refetchApprovedApplications();
        },
        onError: (error) => {
            console.log("Xatolik:", error.response?.data?.message); // 👈 asl xabar shu yerda bo'ladi
            toast.error(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Xatolik yuz berdi"
            );
        }
    });

    const formik = useFormik({
        initialValues: {
            user_id: "",
            edu_course_level: "",
        },
        validationSchema: Yup.object({
            edu_course_level: Yup.number()
                .typeError("Faqat raqam kiriting")
                .integer("Butun son kiriting")
                .required("Kursni kiritish majburiy"),
        }),
        onSubmit: (values) => {
            const confirmData = {
                user_id: parseInt(values.user_id),
                edu_course_level: parseInt(values.edu_course_level),
            };
            confirmMutation.mutate(confirmData);
        },
    });

    const handleOpenModal = (userId) => {
        setSelectedUserId(userId);
        formik.setFieldValue("user_id", userId); // avtomatik user_id kiritish
        setOpen(true);
    };

    const totalCount = 240;
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    const nextPage = () => {
        if (offset + limit < totalCount) setOffset(prev => prev + limit);
    };

    const prevPage = () => {
        if (offset > 0) setOffset(prev => Math.max(prev - limit, 0));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Yuborilgan arizalar</h2>
                    <table className="w-full">
                        <thead>
                        <tr className="text-left bg-gray-50">
                            <th className="p-3 text-gray-600">#</th>
                            <th className="p-3 text-gray-600">User ID</th>
                            <th className="p-3 text-gray-600">F.I.O</th>
                            <th className="p-3 text-gray-600">Ta'lim yo'nalishi</th>
                            <th className="p-3 text-gray-600">Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications?.map((application, index) => (
                            <tr className="border-t" key={application?.id}>
                                <td className="p-3">{offset + index + 1}</td>
                                <td className="p-3">{application?.user_id}</td>
                                <td className="p-3">
                                    {application?.last_name + " " + application?.first_name + " " + application?.third_name}
                                </td>
                                <td className="p-3">
                                    {application?.user?.study_info?.study_direction?.name}
                                </td>
                                <td className="p-3">
                                    {approvedApplications?.some(
                                        (approvedApplication) => approvedApplication?.user_id === application?.user_id
                                    ) ? (
                                        <div>
                                            <button
                                                onClick={() => downloadApplicationTwoPdf(application?.user_id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2"
                                            >
                                                <FaDownload/>
                                            </button>
                                            <button
                                                onClick={() => downloadApplicationThreePdf(application?.user_id)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                                            >
                                                <FaDownload/>
                                            </button>
                                        </div>

                                    ) : (
                                        <button
                                            onClick={() => handleOpenModal(application?.user_id)}

                                            className="p-2 bg-green-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            Tasdiqlash
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between items-center px-20 pb-4">
                <button
                    onClick={prevPage}
                    disabled={offset === 0}
                    className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                >
                    Oldingi
                </button>

                <span className="text-sm text-gray-600">
                        Sahifa: {currentPage} / {totalPages || 1}
                    </span>

                <button
                    onClick={nextPage}
                    disabled={offset + limit >= totalCount}
                    className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
                >
                    Keyingi
                </button>
            </div>

            {/* Modal for confirmation */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Tasdiqlash</DialogTitle>
                    <DialogContent className="space-y-4">
                        <TextField
                            label="User ID"
                            value={formik.values.user_id}
                            fullWidth
                            disabled
                        />
                        <TextField
                            label="Kurs (edu_course_level)"
                            name="edu_course_level"
                            type="number"
                            value={formik.values.edu_course_level}
                            onChange={formik.handleChange}
                            error={formik.touched.edu_course_level && Boolean(formik.errors.edu_course_level)}
                            helperText={formik.touched.edu_course_level && formik.errors.edu_course_level}
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="error">Bekor qilish</Button>
                        <Button type="submit" variant="contained" color="primary" disabled={confirmMutation.isLoading}>
                            {confirmMutation.isLoading ? "Yuborilmoqda..." : "Tasdiqlash"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default ListApplication;
