import React, {useState, forwardRef} from "react";

import {useQuery, useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Button, Dialog, FormControl, InputLabel, Select, Slide} from "@mui/material";
import {MdCancel, MdDelete} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import {
    CreateStudyDirectionApi,
    DeleteStudyDirectionApi,
    GetStudyDirectionApi,
    UpdateStudyDirectionApi
} from "../Api/StudyDirectionApi.jsx";
import {GetStudyFormApi} from "../Api/StudyFormApi.jsx";
import MenuItem from "@mui/material/MenuItem";

const Transition = forwardRef((props, ref) => (
    <Slide direction="left" ref={ref} {...props} />
));

function ListStudyDirection() {
    const [open, setOpen] = useState(false);
    const [editStudyDirection, setEditStudyDirection] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const{data: studyForms, isLoading} = useQuery({
        queryKey: ["study-forms"],
        queryFn: GetStudyFormApi,
    });

    const {data: studyDirections, refetch} = useQuery({
        queryKey: ["study-directions"],
        queryFn: GetStudyDirectionApi,
    });

    const createMutation = useMutation({
        mutationKey: ["create-study-direction"],
        mutationFn: CreateStudyDirectionApi,
        onSuccess: (data) => {
            toast.success(data.message || "Yaratildi");
            handleClose();
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const updateMutation = useMutation({
        mutationKey: ["update-study-direction"],
        mutationFn: UpdateStudyDirectionApi,
        onSuccess: (data) => {
            toast.success(data.message || "Tahrirlandi");
            handleClose();
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const deleteMutation = useMutation({
        mutationKey: ["delete-study-direction"],
        mutationFn: DeleteStudyDirectionApi,
        onSuccess: () => {
            toast.success("O'chirildi");
            setConfirmDeleteId(null);
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            exam_title: "",
            contract_sum: 0,
            education_years: 0,
            study_code: "",
            study_form_id: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Nomi majburiy"),
            contract_sum: Yup.number().required("Summani majburiy"),
            education_years: Yup.number().required("Yil majburiy"),
            study_code: Yup.string().required("Tavsif majburiy"),
            exam_title: Yup.string().required("Nomi majburiy"),
        }),
        onSubmit: (values) => {
            const studyDirectionData = {
                name: values.name,
                contract_sum: values.contract_sum,
                education_years: values.education_years,
                study_code: values.study_code,
                exam_title: values.exam_title,
                study_form_id: values.study_form_id
            };
            if (editStudyDirection) {
                updateMutation.mutate({id: editStudyDirection.id, studyDirectionData,});
            } else {
                createMutation.mutate(studyDirectionData);
            }
        },
    });

    const handleOpen = (item = null) => {
        if (item) {
            setEditStudyDirection(item);
            formik.setValues(
                {
                    name: item.name,
                    exam_title: item.exam_title,
                    education_years: item.education_years,
                    contract_sum: item.contract_sum,
                    study_code: item.study_code,
                    study_form_id: item.study_form_id
                }
            );
        } else {
            setEditStudyDirection(null);
            formik.resetForm();
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditStudyDirection(null);
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
                        {editStudyDirection ? "Tahrirlash" : "Yangi qo‘shish"}
                    </p>
                    <button onClick={handleClose} className="text-red-600 text-2xl"><MdCancel/></button>
                </div>
                <div className="p-6 bg-gray-100">
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ta'lim yunalishi nomi
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
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Imtixon turi
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("exam_title")}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.exam_title && formik.errors.exam_title && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.exam_title}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                O'qish muddati
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("education_years")}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.education_years && formik.errors.education_years && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.education_years}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Kontrakt summasi
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("contract_sum")}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.contract_sum && formik.errors.contract_sum && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.contract_sum}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Yunalish kodi
                            </label>
                            <input
                                type="text"
                                {...formik.getFieldProps("study_code")}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            {formik.touched.study_code && formik.errors.study_code && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.study_code}</p>
                            )}
                        </div>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Ta'lim shaklini tanlang</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.study_form_id}
                                label="Study form"
                                name="study_form_id"
                                onChange={formik.handleChange}
                            >
                                {isLoading ? (
                                    <MenuItem disabled>Loading...</MenuItem>
                                ) : (
                                    studyForms?.map((study_form) => (
                                        <MenuItem key={study_form?.id} value={study_form?.id}>
                                            {study_form?.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>

                        <button type="submit"
                                className="px-5 py-2 bg-[#3697A5] text-white rounded-lg hover:bg-[#2d7f8a]">
                            {editStudyDirection ? "Saqlash" : "Qo‘shish"}
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
                            <th className="p-3">O'qish muddati</th>
                            <th className="p-3">Yunalish kodi</th>
                            <th className="p-3">Kontrakt summa</th>
                            <th className="p-3">Ta'lim turi</th>
                            <th className="p-3 text-center">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studyDirections?.map((type, index) => (
                            <tr key={type.id} className="border-t">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{type.name}</td>
                                <td className="p-3">{type.education_years}</td>
                                <td className="p-3">{type.study_code}</td>
                                <td className="p-3">{type.contract_sum}</td>
                                <td>
                                    {studyForms?.map((study_form) => {
                                        if (study_form.id === type.study_form_id) {
                                            return study_form.name;
                                        }}
                                    )}
                                </td>
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

export default ListStudyDirection;
