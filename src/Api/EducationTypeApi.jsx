import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetEducationTypeApi = async () => {
    try {
        const education_type = await axiosInstance.get(`${API_URL}/api/education_type/get_all`,);
        return education_type.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const CreateEducationTypeApi = async (educationTypeData) => {
    try {

        const response = await axiosInstance.post(
            `${API_URL}/api/education_type/create`,
            {
                name: educationTypeData.name,
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

export const DeleteEducationTypeApi = async (educationTypeId) => {
    const educationType = await axiosInstance.delete(
        `${API_URL}/api/education_type/delete/${educationTypeId}`
    );
    return educationType.data;
};

export const UpdateEducationTypeApi = async ({ id, educationTypeData }) => {
    console.log(id, name)
    const response = await axiosInstance.put(
        `${API_URL}/api/education_type/update/${id}`,
        { name: educationTypeData.name },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};