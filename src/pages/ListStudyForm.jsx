import React, {useState, forwardRef} from "react";

import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Dialog, Slide} from "@mui/material";
import {MdCancel, MdDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import {CreateStudyFormApi, DeleteStudyFormApi, GetStudyFormApi, UpdateStudyFormApi} from "../Api/StudyFormApi.jsx";

const Transition = forwardRef((props, ref) => (
    <Slide direction="left" ref={ref} {...props} />
));

function ListEducationType() {
    const [open, setOpen] = useState(false);
    const [editEducationType, setEditEducationType] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const {data: educationTypes, refetch} = useQuery({
        queryKey: ["study-form"],
        queryFn: GetStudyFormApi,
    });

    const createMutation = useMutation({
        mutationKey: ["create-study-form"],
        mutationFn: CreateStudyFormApi,
        onSuccess: (data) => {
            toast.success(data.message || "Yaratildi");
            handleClose();
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const updateMutation = useMutation({
        mutationKey: ["update-study-form"],
        mutationFn: UpdateStudyFormApi,
        onSuccess: (data) => {
            toast.success(data.message || "Tahrirlandi");
            handleClose();
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const deleteMutation = useMutation({
        mutationKey: ["delete-study-form"],
        mutationFn: DeleteStudyFormApi,
        onSuccess: () => {
            toast.success("O'chirildi");
            setConfirmDeleteId(null);
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const formik = useFormik({
        initialValues: {name: ""},
        validationSchema: Yup.object({
            name: Yup.string().required("Nomi majburiy"),
        }),
        onSubmit: (values) => {
            const educationTypeData = {
                name: values.name,
            };
            if (editEducationType) {
                updateMutation.mutate({id: editEducationType.id, educationTypeData,});
            } else {
                createMutation.mutate(educationTypeData);
            }
        },
    });

    const handleOpen = (item = null) => {
        if (item) {
            setEditEducationType(item);
            formik.setValues({name: item.name});
        } else {
            setEditEducationType(null);
            formik.resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditEducationType(null);
        formik.resetForm();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between px-6 items-center">
                <h2 className="text-2xl font-bold text-gray-800">Bitirgan ta’lim muassasa turlari</h2>
                <Button variant="contained" onClick={() => handleOpen()}>
                    Yangi qo‘shish
                </Button>
            </div>

            <Dialog open={open} TransitionComponent={Transition} keepMounted PaperProps={{
                sx: {position: "fixed", right: 15, top: 20, width: 500, borderRadius: 2},
            }}>
                <div className="flex justify-between items-center p-4">
                    <p className="text-2xl font-bold text-gray-800">
                        {editEducationType ? "Tahrirlash" : "Yangi qo‘shish"}
                    </p>
                    <button onClick={handleClose} className="text-red-600 text-2xl"><MdCancel/></button>
                </div>
                <div className="p-6 bg-gray-100">
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Bitirgan ta'lim muassasa turi
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("name")}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                            )}
                        </div>
                        <button type="submit"
                                className="px-5 py-2 bg-[#3697A5] text-white rounded-lg hover:bg-[#2d7f8a]">
                            {editEducationType ? "Saqlash" : "Qo‘shish"}
                        </button>
                    </form>
                </div>
            </Dialog>

            <div className="bg-white shadow rounded-lg">
                <div className="p-4">
                    <table className="w-full">
                        <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="p-3">#</th>
                            <th className="p-3">Nomi</th>
                            <th className="p-3 text-center">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {educationTypes?.map((type, index) => (
                            <tr key={type.id} className="border-t">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{type.name}</td>
                                <td className="p-3 flex justify-center gap-3">
                                    <button onClick={() => handleOpen(type)}>
                                        <FaRegEdit className="text-2xl text-[#3697A5]"/>
                                    </button>
                                    <button onClick={() => setConfirmDeleteId(type.id)}>
                                        <MdDelete className="text-2xl text-red-600"/>
                                    </button>
                                    {confirmDeleteId === type.id && (
                                        <div
                                            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                                <h2 className="text-lg font-semibold mb-2">Haqiqatan
                                                    o‘chirmoqchimisiz?</h2>
                                                <div className="flex justify-end gap-3 mt-4">
                                                    <button onClick={() => setConfirmDeleteId(null)}
                                                            className="px-4 py-2 bg-gray-300 rounded">
                                                        Bekor
                                                    </button>
                                                    <button onClick={() => deleteMutation.mutate(type.id)}
                                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                                        O‘chirish
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListEducationType;
