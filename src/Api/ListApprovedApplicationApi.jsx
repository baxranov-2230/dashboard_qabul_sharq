import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetListApprovedApplicationApi = async () => {
    try {
        const approvedApplication = await axiosInstance.get(`${API_URL}/api/contract/get_all`,);
        return approvedApplication.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};


// export const ConfirmApplicationApi = async (confirmData) => {
//     console.log(confirmData);
//     try {
//         const response = await axiosInstance.post(
//             `${API_URL}/api/contract`,
//             {
//                 user_id: confirmData.user_id,
//                 edu_course_level: confirmData.edu_course_level,
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             }
//         );
//
//
//         return await response.data;
//     } catch (error) {
//         if (error.response && error.response.data.message) {
//             throw new Error(error.response.data.message);
//         }
//         throw new Error(error.response.data.detail);
//     }
// };