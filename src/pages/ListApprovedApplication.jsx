import React, {useState} from "react";
import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

import {ConfirmApplicationApi, GetListUserApplicationApi} from "../Api/ListUserApplicationApi.jsx";
import {GetListApprovedApplicationApi} from "../Api/ListApprovedApplicationApi.jsx";


function ListApplication() {
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const {data: applications, refetch} = useQuery({
        queryKey: ["list-application"],
        queryFn: GetListApprovedApplicationApi,
    });

    // const confirmMutation = useMutation({
    //     mutationKey: ["confirm-application"],
    //     mutationFn: ConfirmApplicationApi,
    //     onSuccess: (data) => {
    //         toast.success(data.message || "Muvaffaqiyatli tasdiqlandi");
    //         setOpen(false);
    //         formik.resetForm();
    //         refetch();
    //     },
    //     onError: (error) => {
    //         console.log("Xatolik:", error.response?.data?.message); // 👈 asl xabar shu yerda bo'ladi
    //         toast.error(
    //             error.response?.data?.message ||
    //             JSON.stringify(error.response?.data) ||
    //             "Xatolik yuz berdi"
    //         );
    //     }
    // });
    //
    // const formik = useFormik({
    //     initialValues: {
    //         user_id: "",
    //         edu_course_level: "",
    //     },
    //     validationSchema: Yup.object({
    //         edu_course_level: Yup.number()
    //             .typeError("Faqat raqam kiriting")
    //             .integer("Butun son kiriting")
    //             .required("Kursni kiritish majburiy"),
    //     }),
    //     onSubmit: (values) => {
    //         const confirmData = {
    //             user_id: parseInt(values.user_id),
    //             edu_course_level: parseInt(values.edu_course_level),
    //         };
    //         confirmMutation.mutate(confirmData);
    //     },
    // });

    // const handleOpenModal = (userId) => {
    //     setSelectedUserId(userId);
    //     formik.setFieldValue("user_id", userId); // avtomatik user_id kiritish
    //     setOpen(true);
    // };

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
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{application?.user_id}</td>
                                <td className="p-3">
                                    {application?.last_name + " " + application?.first_name + " " + application?.third_name}
                                </td>
                                <td className="p-3">
                                    {application?.user?.study_info?.study_direction?.name}
                                </td>
                                {/*<td className="p-3">*/}
                                {/*    <button*/}
                                {/*        onClick={() => handleOpenModal(application?.user_id)}*/}
                                {/*        className="p-2 bg-green-600 text-white rounded"*/}
                                {/*    >*/}
                                {/*        Tasdiqlash*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for confirmation */}
            {/*<Dialog open={open} onClose={() => setOpen(false)}>*/}
            {/*    <form onSubmit={formik.handleSubmit}>*/}
            {/*        <DialogTitle>Tasdiqlash</DialogTitle>*/}
            {/*        <DialogContent className="space-y-4">*/}
            {/*            <TextField*/}
            {/*                label="User ID"*/}
            {/*                value={formik.values.user_id}*/}
            {/*                fullWidth*/}
            {/*                disabled*/}
            {/*            />*/}
            {/*            <TextField*/}
            {/*                label="Kurs (edu_course_level)"*/}
            {/*                name="edu_course_level"*/}
            {/*                type="number"*/}
            {/*                value={formik.values.edu_course_level}*/}
            {/*                onChange={formik.handleChange}*/}
            {/*                error={formik.touched.edu_course_level && Boolean(formik.errors.edu_course_level)}*/}
            {/*                helperText={formik.touched.edu_course_level && formik.errors.edu_course_level}*/}
            {/*                fullWidth*/}
            {/*            />*/}

            {/*        </DialogContent>*/}
            {/*        <DialogActions>*/}
            {/*            <Button onClick={() => setOpen(false)} color="error">Bekor qilish</Button>*/}
            {/*            <Button type="submit" variant="contained" color="primary" disabled={confirmMutation.isLoading}>*/}
            {/*                {confirmMutation.isLoading ? "Yuborilmoqda..." : "Tasdiqlash"}*/}
            {/*            </Button>*/}
            {/*        </DialogActions>*/}
            {/*    </form>*/}
            {/*</Dialog>*/}
        </div>
    );
}

export default ListApplication;
