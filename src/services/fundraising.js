export const REACT_APP_API_BASE_URL = "http://localhost:4000"

const buildUrl = (path) => `${REACT_APP_API_BASE_URL.replace(/\/$/, "")}/fundraising${path}`;

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

export const getAllFundraisers = async (token) => {
    return request("/get-all", {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
};

export const closeFundraising = async (id, token) => {
    return request(`/close?fundraisingId=${id}`, {
        method: "PATCH",
        headers: {
            Authorization: token
        }
    });
};

export const returnFundraising = async (id, token) => {
    return request(`/return?fundraisingId=${id}`, {
        method: "PATCH",
        headers: {
            Authorization: token
        }
    });
};
