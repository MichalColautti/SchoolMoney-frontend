export const REACT_APP_API_BASE_URL = "http://localhost:4000"

const buildUrl = (path) => `${REACT_APP_API_BASE_URL.replace(/\/$/, "")}${path}`;

export const request = async (path, options = {}) => {
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

    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null;
    }

    const text = await response.text();

    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};