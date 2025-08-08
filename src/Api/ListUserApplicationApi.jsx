import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetListUserApplicationApi = async ({ limit = 10, offset = 0, passport_series_number = "" }) => {
    try {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        // if (first_name) {
        //     params.append("first_name", first_name); // 👈 API hujjatidagi nom
        // }
        if (passport_series_number) {
            params.append("passport_series_number", passport_series_number); // Bitta terim — F.I.O yoki pasport uchun
        }

        const userapplication = await axiosInstance.get(
            `${API_URL}/api/study_info/applications?${params.toString()}`
        );
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

export const GetListApplicationCountApi = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/api/user_data/users_with_study_info`,);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};