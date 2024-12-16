import axios from "axios";
import dayjs from 'dayjs';

// Функция для получения terms 
export const getTerms = async () => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем запрос с токеном в заголовке
        const response = await axios.get(
            `http://localhost:5134/api/Term/GetAllTerms`,
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