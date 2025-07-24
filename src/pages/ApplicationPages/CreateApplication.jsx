// import React, {useEffect, useState} from "react";
// import {useFormik} from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import {useMutation, useQuery} from "@tanstack/react-query";
// import {FormControl, FormControlLabel, FormLabel, InputLabel, Radio, RadioGroup, Select} from "@mui/material";
// import {
//     CreateApplicationApi,
//     GetEducationTypeApi,
//     GetPassportApi,
//     GetStudyDirectionApi,
//     GetStudyFormApi,
//     GetStudyLanguageApi,
//     GetStudyTypeApi
// } from "../../Api/UserApi.jsx";
// import MenuItem from "@mui/material/MenuItem";
//
//
//
// function CreateStudyLanguage() {
//     const navigate = useNavigate();
//
//
//
//     const {isLoading: loadingStudyTypes, data: studyTypes} = useQuery({
//         queryKey: ['study-type'],
//         queryFn: GetStudyTypeApi,
//     })
//
//     const {isLoading: loadingStudyForms, data: studyForms} = useQuery({
//         queryKey: ['study-form'],
//         queryFn: GetStudyFormApi,
//     })
//
//     const {data: studyLanguages} = useQuery({
//         queryKey: ['study-language'],
//         queryFn: GetStudyLanguageApi,
//     })
//
//     const {isLoading: loadingEducationTypes, data: educationTypes} = useQuery({
//         queryKey: ['education-type'],
//         queryFn: GetEducationTypeApi,
//     })
//
//     const {isLoading: loadingStudyDirections, data: studyDirections} = useQuery({
//         queryKey: ['study-direction'],
//         queryFn: GetStudyDirectionApi,
//     })
//
//     const [filteredStudyForms, setFilteredStudyForms] = useState(studyForms);
//
//
//     const applicationMutation = useMutation({
//         mutationKey: ["create-application"], mutationFn: CreateApplicationApi,
//         onSuccess: (data) => {
//             toast.success(data.message || "Ariza muvaffaqiyatli yaratildi");
//         }, onError: (error) => {
//             toast.error(error.message || "Xatolik yuz berdi");
//         },
//     });
//     const formik = useFormik({
//         initialValues: {
//             study_language_id: "",
//             study_form_id: "",
//             study_direction_id: "",
//             study_type_id: "",
//             education_type_id: "",
//             graduate_year: "",
//             certificate_path: "",
//             dtm_sheet: "",
//         },
//         validationSchema: Yup.object({
//             // study_language_id: Yup.string().required("!!! To'ldirish shart"),
//             study_form_id: Yup.string().required("!!! To'ldirish shart"),
//             study_direction_id: Yup.string().required("!!! To'ldirish shart"),
//             study_type_id: Yup.string().required("!!! To'ldirish shart"),
//             education_type_id: Yup.string().required("!!! To'ldirish shart"),
//             graduate_year: Yup.string().required("!!! To'ldirish shart"),
//         }), onSubmit: (values) => {
//             // setFormData(values);
//             const studentData = {
//                 study_language_id: 4,
//                 certificate_path: "string",
//                 dtm_sheet: "string",
//                 study_form_id: values.study_form_id,
//                 study_direction_id: values.study_direction_id,
//                 study_type_id: values.study_type_id,
//                 education_type_id: values.education_type_id,
//                 graduate_year: values.graduate_year,
//             };
//             applicationMutation.mutate(studentData);
//         },
//     });
//     const isSuccess = applicationMutation.isSuccess;
//
//     useEffect(() => {
//         if (isSuccess) {
//             navigate("/list-application");
//             window.location.reload();
//         }
//     }, [navigate, isSuccess]);
//
//     useEffect(() => {
//         if (formik.values.study_type_id === 3) { // Bakalavr ID si 1 deb faraz qilindi
//             setFilteredStudyForms(studyForms.filter((form) => form.name !== 'Sirtqi'));
//         } else {
//             setFilteredStudyForms(studyForms); // Boshqa hollarda barcha shakllar ko'rinadi
//         }
//     }, [formik.values.study_type_id]);
//
//
//     return (<div className="space-y-6">
//         <h2 className="text-2xl font-bold text-gray-800">Ariza yuborish</h2>
//
//
//         <div className="bg-white rounded-lg shadow">
//             <div className="p-4 border-b bg-gray-50  ">
//                 <form
//                     onSubmit={formik.handleSubmit}
//                 >
//                     <div className="grid md:grid-cols-2 gap-3">
//                         <div className="w-full">
//                             <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">O'qish turini
//                                 tanlang</p>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">O'qish turini tanlang </InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={formik.values.study_type_id}
//                                     label="study_type_id"
//                                     name="study_type_id"
//                                     onChange={formik.handleChange}
//                                 >
//                                     {loadingStudyTypes ? (
//                                         <MenuItem disabled>Loading...</MenuItem>
//                                     ) : (
//                                         studyTypes?.map((studyType) => (
//                                             <MenuItem key={studyType?.id} value={studyType?.id}>
//                                                 {studyType?.name}
//                                             </MenuItem>
//                                         ))
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         <div className="w-full">
//                             <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Tugatgan ta'lim
//                                 muassasa turini tanlang</p>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Tugatgan ta'lim muassasa turini
//                                     tanlang</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={formik.values.education_type_id}
//                                     label="education_type_id"
//                                     name="education_type_id"
//                                     onChange={formik.handleChange}
//                                 >
//                                     {loadingEducationTypes ? (
//                                         <MenuItem disabled>Loading...</MenuItem>
//                                     ) : (
//                                         educationTypes?.map((educationType) => (
//                                             <MenuItem key={educationType?.name} value={educationType?.id}>
//                                                 {educationType?.name}
//                                             </MenuItem>
//                                         ))
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         <div className="w-full">
//                             <label htmlFor="graduate_year"
//                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                                 Bitirgan yilingizni kiriting
//                             </label>
//
//
//                             <input type="text"
//                                    id="graduate_year"
//                                    name="graduate_year"
//                                    placeholder="2020"
//                                    value={formik.values.graduate_year}
//                                    onChange={formik.handleChange}
//                                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//                         </div>
//                         <div className="w-full">
//                             <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Ta'lim shaklini
//                                 tanlang</p>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Ta'lim shaklini tanlang</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={formik.values.study_form_id}
//                                     label="study_form_id"
//                                     name="study_form_id"
//                                     onChange={formik.handleChange}
//                                 >
//                                     {loadingStudyForms ? (
//                                         <MenuItem disabled>Loading...</MenuItem>
//                                     ) : (
//                                         filteredStudyForms?.map((studyForm) => (
//                                             <MenuItem key={studyForm?.name} value={studyForm?.id}>
//                                                 {studyForm?.name}
//                                             </MenuItem>
//                                         ))
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         <div className="w-full">
//                             <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Ta'lim yunalishini
//                                 tanlang</p>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Ta'lim yunalishini tanlang</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={formik.values.study_direction_id}
//                                     label="study_direction_id"
//                                     name="study_direction_id"
//                                     onChange={formik.handleChange}
//                                 >
//                                     {loadingStudyDirections ? (
//                                         <MenuItem disabled>Loading...</MenuItem>
//                                     ) : (
//                                         studyDirections?.map((studyDirection) => (
//                                             <MenuItem key={studyDirection?.id} value={studyDirection?.id}>
//                                                 {studyDirection?.name}
//                                             </MenuItem>
//                                         ))
//                                     )}
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         {/*<div className="w-full">*/}
//                         {/*    <FormControl>*/}
//                         {/*        <p className="mb-2 text-md font-medium text-gray-900 dark:text-white">Sertifikatingiz bormi?</p>*/}
//                         {/*        <RadioGroup*/}
//                         {/*            row*/}
//                         {/*            aria-labelledby="demo-row-radio-buttons-group-label"*/}
//                         {/*            name="row-radio-buttons-group"*/}
//                         {/*        >*/}
//                         {/*            <FormControlLabel value="yes" control={<Radio />} label="Yes" />*/}
//                         {/*            <FormControlLabel value="no" control={<Radio />} label="No" />*/}
//
//                         {/*        </RadioGroup>*/}
//                         {/*    </FormControl>*/}
//                         {/*</div>*/}
//
//
//                     </div>
//                     <button type="submit"
//                             className="mt-4 focus:outline-none w-full text-white bg-[#154576] hover:bg-[#0361B9]  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
//                         Yuborish
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </div>);
// }
//
// export default CreateStudyLanguage;
