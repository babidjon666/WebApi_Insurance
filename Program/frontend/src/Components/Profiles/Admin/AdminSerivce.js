import axios from "axios";

export const createTerm = async (
    desc,
    dateTime
) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post(
            "http://localhost:5134/api/Term/CreateTerm", 
            {
                desc: desc,
                dateTime: dateTime
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

export const deleteTerm = async (termId) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем запрос с токеном в заголовке
        const response = await axios.delete(
            `http://localhost:5134/api/Term/DeleteTerm?termId=${termId}`,
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

export const getAllWaitingRequests = async () => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        // Отправляем запрос с токеном в заголовке
        const response = await axios.get(
            `http://localhost:5134/api/Request/GetAllWaitingRequests`,
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

export const editRequestStatus = async (
    requestId,
    requestStatus
) => {
    try {
        const token = localStorage.getItem("userToken");

        if (!token) {
            throw new Error("Unauthorized: Token is missing");
        }

        const response = await axios.post(
            "http://localhost:5134/api/Request/EditRequestStatus", 
            {
                requestId: requestId,
                requestStatus: requestStatus
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