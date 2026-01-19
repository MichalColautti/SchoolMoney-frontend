export const REACT_APP_API_BASE_URL = "http://localhost:4000"

const buildUrl = (path) => `${REACT_APP_API_BASE_URL.replace(/\/$/, "")}/class${path}`;

const request = async (path, options = {}) => {
    const headers = {...options.headers};

    if(!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(buildUrl(path), {
        ...options,
        headers: headers,
    });

    if (!response.ok) {
        let errorMessage;
        try{
            errorMessage = await response.text();
        }
        catch(error) {
            errorMessage = `Request failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

export const getAllClasses = async (token) => {
    return request("/get-all", {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
};

export const changeClassBlockStatus = async (classId, isLocked, token) => {
    return request(`/${classId}/status?isLocked=${isLocked}`, {
        method: "PATCH",
        headers: {
            Authorization: token
        }
    });
};
