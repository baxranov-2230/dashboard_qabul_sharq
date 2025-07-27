import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetListUserApplicationApi = async () => {
    try {
        const userapplication = await axiosInstance.get(`${API_URL}/api/user_data/get_user_data_by_passport_data_filter`,);
        return userapplication.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};


export const ConfirmApplicationApi = async (confirmData) => {
    console.log(confirmData.user_id, confirmData.edu_course_level);

    try {
        const formData = new FormData();
        formData.append("user_id", confirmData.user_id || "");
        formData.append("edu_course_level", confirmData.edu_course_level || "");
        // console.log(formData)
        const response = await axiosInstance.post(
            `${API_URL}/api/contract`, formData,
            // {
            //     headers: {
            //         "Content-Type": "multipart/form-data", // Fayl yuborish uchun zarur sarlavha
            //     },
            // }
        );


        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};