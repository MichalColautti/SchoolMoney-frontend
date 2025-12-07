const API_BASE_URL = "http://localhost:4000";

const buildUrl = (path) => `${API_BASE_URL.replace(/\/$/, "")}${path}`;

const request = async (path, options = {}) => {
    const response = await fetch(buildUrl(path), {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    let responseBody;
    try {
        responseBody = await response.json();
    } catch (err) {
        responseBody = null;
    }

    if (!response.ok) {
        const message = responseBody?.message || `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return responseBody;
};

const authorizedRequest = async (path, token, options = {}) =>
    request(path, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        , ...options,
    });


export const loginRequest = async (credentials) =>
    request("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });


export const registerRequest = async (payload) =>
    request("/parent/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });

export const logoutRequest = async (token) =>
    authorizedRequest("/auth/logout", token,{
        method: "GET",
    });
