import axios from "axios";


const API_URL =  import.meta.env.VITE_API_URL;
import axiosInstance from "./axiosinstance";


export const GetAllFaculty = async () => {
    const allFaculty = await axios.get(`${API_URL}/faculty/get_faculties`);
    return allFaculty.data;
};

export const CreateFacultyApi = async (facultyDate) => {
    try {
        const formData = new FormData();
        formData.append("name_uz", facultyDate.name_uz || "");
        formData.append("name_ru", facultyDate.name_ru || "");
        formData.append("name_en", facultyDate.name_en || "");
        if (facultyDate.faculty_icon) {
            formData.append('faculty_icon', facultyDate.faculty_icon);
            console.log("Fayl nomi:", facultyDate.faculty_icon);
        }
        console.log(formData)
        const response = await axiosInstance.post(
            `${API_URL}/faculty/add_faculty`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl yuborish uchun zarur sarlavha
                },
            }
        );
        console.log("Serverdan kelgan javob:", response.data)
        return await response.data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail);
    }
};
export const DeleteFaculty = async (facultyId) => {
    const Faculty = await axiosInstance.delete(
        `${API_URL}/faculty/delete_faculty/${facultyId}`
    );
    return Faculty.data;
};

export const detailFaculty = async (facultyId) => {
    const faculty = await axiosInstance.get(`${API_URL}/faculty/faculty_detail/${facultyId}`, {});
    return faculty.data;
};
//
// export const UpdateFacultyApi = async (facultyDate) => {
//     const response = await axiosInstance.put(
//         `${API_URL}/update_faculty/${facultyDate?.facultyId}`,
//         {
//             name_uz: facultyDate.name_uz,
//             name_ru: facultyDate.name_ru,
//             name_en: facultyDate.name_en,
//             faculty_icon: facultyDate.faculty_icon,
//         },
//         {
//             headers: {
//                 "Content-Type": "multipart/form-data", // Fayl jo‘natish uchun kerakli sarlavha
//             },
//         }
//     );
//     return response.data;
// };

export const UpdateFacultyApi = async (facultyId, facultyDate) => {
    try {
        const formData = new FormData();
        formData.append("name_uz", facultyDate.name_uz || ""); // O‘zbekcha nom
        formData.append("name_ru", facultyDate.name_ru || ""); // Ruscha nom
        formData.append("name_en", facultyDate.name_en || ""); // Inglizcha nom

        // Agar yangi fakultet ikonkasi yuklansa, uni qo‘shish
        if (facultyDate.faculty_icon) {
            formData.append('faculty_icon', facultyDate.faculty_icon);
        }

        console.log("Yuborilayotgan ma'lumotlar:");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axiosInstance.put(
            `${API_URL}/faculty/update_faculty/${facultyId}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Fayl jo‘natish uchun kerakli sarlavha
                },
            }
        );
        console.log("Serverdan kelgan javob:", response.data);
        return await response.data; // Serverdan kelgan javobni qaytarish
    } catch (error) {
        // Xatolikni tekshirish va foydalanuvchiga tushunarli xabar qaytarish
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.response.data.detail || "Fakultetni yangilashda xatolik yuz berdi");
    }
};
