const API_URL = "http://localhost:4000/chat";

export const getChatChannels = async (token) => {
    const response = await fetch(`${API_URL}/channels`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch chat channels");
    }

    return await response.json();
};

export const getChatMessages = async (token, conversationId, beforeMessageId = "", limit = 50) => {
    const queryParams = new URLSearchParams();
    if (beforeMessageId) {
        queryParams.append("beforeMessageId", beforeMessageId);
    }
    if (limit) {
        queryParams.append("limit", limit);
    }

    const response = await fetch(`${API_URL}/${conversationId}/messages?${queryParams.toString()}`, {
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch messages");
    }

    return await response.json();
};

export const uploadImage = async (token, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:4000/image/upload", {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }

    return await response.json();
};

export const createChat = async (token, userId) => {
    const response = await fetch(`${API_URL}/create/${userId}`, {
        method: "GET",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to create chat");
    }

    return await response.json();
};
