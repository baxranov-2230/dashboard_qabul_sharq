import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetListUserApplicationApi = async ({limit = 10, offset = 0}) => {
    try {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);
        const userapplication = await axiosInstance.get(`${API_URL}/api/user_data/get_user_data_by_passport_data_filter?${params.toString()}`,);
        return userapplication.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};


export const ConfirmApplicationApi = async (confirmData) => {
    console.log(confirmData);
    try {
        const response = await axiosInstance.post(
            `${API_URL}/api/contract`,
            {
                user_id: confirmData.user_id,
                edu_course_level: confirmData.edu_course_level,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );


        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};

export const downloadApplicationTwoPdf = async (userId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/api/contract/download/ikki/${userId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${userId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};

export const downloadApplicationThreePdf = async (userId) => {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/api/contract/download/uch/${userId}`,
            {
                responseType: "blob", // blob kerak, chunki bu fayl
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `application_${userId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Faylni yuklab olishda xatolik:", error);
        alert("Faylni yuklab bo‘lmadi.");
    }
};