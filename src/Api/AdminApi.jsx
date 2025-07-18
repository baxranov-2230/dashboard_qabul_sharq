import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


// export const CreateStudyLanguageApi = async (studyLanguageDate) => {
//     console.log(studyLanguageDate)
//
//     try {
//         const response = await axiosInstance.post(
//             `${API_URL}/api/study_language/create`,
//             {
//                 name: studyLanguageDate.name,
//             },
//             // {
//             //     headers: {
//             //         "Content-Type": "application/json", // 🔐 juda muhim!
//             //     },
//             // }
//         );
//         return await response.data;
//     } catch (error) {
//         console.log(error.response.data)
//         if (error.response && error.response.data.message) {
//             throw new Error(error.response.data.message);
//         }
//         throw new Error(error.response.data.detail);
//     }
// };
//
// export const GetAllStudyLanguageApi = async () => {
//     const allLanguage = await axiosInstance.get(`${API_URL}/api/study_language/get_all`);
//     return allLanguage.data;
// };
//
// export const DeleteStudyLanguageApi = async (languageId) => {
//     const Language = await axiosInstance.delete(
//         `${API_URL}/api/study_language/delete/${languageId}`
//     );
//     return Language.data;
// };