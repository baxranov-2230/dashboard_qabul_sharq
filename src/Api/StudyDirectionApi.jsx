import axiosInstance from './axiosinstance'
import axiosInstancePost from './axiosinstance'

const API_URL = import.meta.env.VITE_API_URL


export const GetStudyDirectionApi = async () => {
    try {
        const study_direction = await axiosInstance.get(`${API_URL}/api/study_direction/get_all`,);
        return study_direction.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const CreateStudyDirectionApi = async (studyDirectionData) => {
    try {

        const response = await axiosInstance.post(
            `${API_URL}/api/study_direction/create`,
            {
                name: studyDirectionData.name,
                exam_title: studyDirectionData.exam_title,
                education_years: studyDirectionData.education_years,
                contract_sum: studyDirectionData.contract_sum,
                study_code: studyDirectionData.study_code,
                study_form_id: studyDirectionData.study_form_id
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

export const DeleteStudyDirectionApi = async (studyDirectionId) => {
    const educationType = await axiosInstance.delete(
        `${API_URL}/api/study_direction/delete/${studyDirectionId}`
    );
    return educationType.data;
};

export const UpdateStudyDirectionApi = async ({id, studyDirectionData}) => {
    console.log(id, studyDirectionData)
    const response = await axiosInstance.put(
        `${API_URL}/api/study_direction/update/${id}`,
        {
            name: studyDirectionData.name,
            exam_title: studyDirectionData.exam_title,
            education_years: studyDirectionData.education_years,
            contract_sum: studyDirectionData.contract_sum,
            study_code: studyDirectionData.study_code,
            study_form_id: studyDirectionData.study_form_id
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};