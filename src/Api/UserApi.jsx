const API_URL = import.meta.env.VITE_API_URL;

import axiosInstance from "./axiosinstance";


export const GetPassportApi = async () => {
    try {
        const passport = await axiosInstance.get(`${API_URL}/api/passport_data`,);
        return passport.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetStudyDirectionApi = async () => {
    try {
        const study_direction = await axiosInstance.get(`${API_URL}/api/application/study_direction`,);
        return study_direction.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetStudyTypeApi = async () => {
    try {
        const study_type = await axiosInstance.get(`${API_URL}/api/application/study_type`,);
        return study_type.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

// export const GetStudyFormApi = async () => {
//     try {
//         const study_form = await axiosInstance.get(`${API_URL}/api/application/study_form`,);
//         return study_form.data;
//     } catch (error) {
//         if (error.response?.status === 404) {
//             return null;
//         }
//         throw error;
//     }
// };

export const GetStudyLanguageApi = async () => {
    try {
        const study_language = await axiosInstance.get(`${API_URL}/api/application/study_language`,);
        return study_language.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const GetEducationTypeApi = async () => {
    try {
        const education_type = await axiosInstance.get(`${API_URL}/api/application/education_type`,);
        return education_type.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
};

export const CreateApplicationApi = async (studentData) => {
    try {
        console.log(studentData)
        const response = await axiosInstance.post(
            `${API_URL}/api/application/create`,
            {

                study_form_id: studentData.study_form_id,
                study_direction_id: studentData.study_direction_id,
                study_type_id: studentData.study_type_id,
                education_type_id: studentData.education_type_id,
                graduate_year: studentData.graduate_year,
                study_language_id: studentData.study_language_id,
                certificate_path: studentData.certificate_path,
                dtm_sheet: studentData.dtm_sheet,
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

// export const GetApplicationApi = async () => {
//     try {
//         const application = await axiosInstance.get(`${API_URL}/api/application`,);
//         return application.data;
//     } catch (error) {
//         if (error.response?.status === 404) {
//             return null;
//         }
//         throw error;
//     }
// };

