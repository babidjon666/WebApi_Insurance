import axios from "axios";

// Функция для получения заявок пользователя
export const getUsersRequests = async (userId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.get(
            `http://localhost:5134/api/Request/GetUsersRequests?userId=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Get Requests error:", error);
        throw error;
    }
};

export const createRequest = async (
    userId,
    goal,
    date,
    requestStatus
) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post(
            "http://localhost:5134/api/Request/CreateRequest", 
            {
                userId: userId,
                goal: goal,
                date: date,
                requestStatus: requestStatus,
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
