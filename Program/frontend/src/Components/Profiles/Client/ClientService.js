import axios from "axios";
import dayjs from 'dayjs';

// Функция для получения профиля пользователя
export const getProfile = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем запрос с токеном в заголовке
        const response = await axios.get(
            `http://localhost:5134/api/Profile/GetUserProfile?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Get profile error:", error);
        throw error;
    }
};

// функция для форматирование национальности 
export const getNationalityName = (nationality) => {
    const nationalities = [
        "Azerbaijan",
        "Tajikistan",
        "Uzbekistan",
        "Moldova",
        "Ukraine",
        "Kyrgyzstan",
        "Kazakhstan",
        "Armenia",
        "Belarus"
    ];
    return nationalities[nationality] || "Unknown";
};

// функция для форматирования даты
export const formatDate = (date) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "Not specified";
};

// Функция для редактирования пасспорта
export const editPassport = async (
    id,
    documentNumber,
    serie,
    sex,
    placeOfBirthday,
    codeOfState,
    nationality,
    issuingAuthority,
    placeOfResidence,
    dateOfBirth,
    dateOfIssue,
    dateOfExpiry
) => {
    try {
        // Получаем токен из localStorage
        const token = localStorage.getItem("userToken");

        // Если токен отсутствует, выбрасываем ошибку
        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем POST-запрос с токеном в заголовке
        const response = await axios.post(
            "http://localhost:5134/api/Profile/EditPassport", // Убедитесь, что URL правильный
            {
                id: id,
                documentNumber: documentNumber,
                serie: serie,
                sex: sex,
                placeOfBirthday: placeOfBirthday,
                codeOfState: codeOfState,
                nationality: nationality,
                issuingAuthority: issuingAuthority,
                placeOfResidence: placeOfResidence,
                dateOfBirth: dateOfBirth,
                dateOfIssue: dateOfIssue,
                dateOfExpiry: dateOfExpiry,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Passport error:", error);
        throw error; 
    }
};

export const editEmploymentContract = async (
    id,
    numberOfContract,
    date,
    inn,
    kpp
) => {
    try {
        // Получаем токен из localStorage
        const token = localStorage.getItem("userToken");

        // Если токен отсутствует, выбрасываем ошибку
        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем POST-запрос с токеном в заголовке
        const response = await axios.post(
            "http://localhost:5134/api/Profile/EditemploymentContract", // Убедитесь, что URL правильный
            {
                id: id,
                numberOfContract: numberOfContract,
                date: date,
                inn: inn,
                kpp: kpp
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Passport error:", error);
        throw error; 
    }
};

export const editResidentCard = async (
    id,
    documentNumber,
    documentSerie,
    dateOfIssue,
    dateOfExpiry,
    issuingAuthority
) => {
    try {
        // Получаем токен из localStorage
        const token = localStorage.getItem("userToken");

        // Если токен отсутствует, выбрасываем ошибку
        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем POST-запрос с токеном в заголовке
        const response = await axios.post(
            "http://localhost:5134/api/Profile/EditResidentCard", // Убедитесь, что URL правильный
            {
                id: id,
                documentNumber: documentNumber,
                documentSerie: documentSerie,
                dateOfIssue: dateOfIssue,
                dateOfExpiry: dateOfExpiry,
                issuingAuthority: issuingAuthority
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Passport error:", error);
        throw error; 
    }
};

export const editTemporaryResidencePermit = async (
    id,
    documentNumber,
    dacisionDate,
    dateOfExpiry,
    issuingAuthority
) => {
    try {
        // Получаем токен из localStorage
        const token = localStorage.getItem("userToken");

        // Если токен отсутствует, выбрасываем ошибку
        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем POST-запрос с токеном в заголовке
        const response = await axios.post(
            "http://localhost:5134/api/Profile/EditTemporaryResidencePermit", // Убедитесь, что URL правильный
            {
                id: id,
                documentNumber: documentNumber,
                dacisionDate: dacisionDate,
                dateOfExpiry: dateOfExpiry,
                issuingAuthority: issuingAuthority
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data; 
    } catch (error) {
        console.error("Passport error:", error);
        throw error; 
    }
};

