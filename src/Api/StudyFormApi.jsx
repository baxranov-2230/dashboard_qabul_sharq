import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetStudyFormApi = async () => {
    try {
        const study_form = await axiosInstance.get(`${API_URL}/api/study_form/get_all`,);
        return study_form.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const CreateStudyFormApi = async (studyFormData) => {
    try {

        const response = await axiosInstance.post(
            `${API_URL}/api/study_form/create`,
            {
                name: studyFormData.name,
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

export const DeleteStudyFormApi = async (studyFormId) => {
    const response = await axiosInstance.delete(
        `${API_URL}/api/study_form/delete/${studyFormId}`
    );
    return response.data;
};

export const UpdateStudyFormApi = async ({ id, studyFormData }) => {
    console.log(id, name)
    const response = await axiosInstance.put(
        `${API_URL}/api/study_form/update/${id}`,
        { name: studyFormData.name },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};