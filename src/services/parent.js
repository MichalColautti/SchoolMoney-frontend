export const REACT_APP_API_BASE_URL = "http://localhost:4000"

const buildUrl = (path) => `${REACT_APP_API_BASE_URL.replace(/\/$/, "")}/parent${path}`;

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

    const responseText = await response.text();
    if(!responseText){
        return null;
    }
    return JSON.parse(responseText);

};

export const addChild = async (data, token) => {
    try{
        const formData = new FormData();

        const addChildDto = {
            name: data.name,
            surname: data.surname,
            birthday: data.birthday.toISOString().split('T')[0],
        }

        formData.append('childData', new Blob([JSON.stringify(addChildDto)], {
            type: 'application/json'
        }));

        formData.append('childPhoto', data.photo);

        return request("/add-child",{
            method: "POST",
            body: formData,
            headers: {
                "Authorization": token
            }
        })
    }
    catch(err){
        throw err;
    }
}

export const addChildById = async (childId, token) => {
    return request("/add-child-by-id",{
        method: "POST",
        body: JSON.stringify(childId),
        headers: {
            "Authorization": token
        }
    })
}

export const findParent = async (name, token, limit = 5) => {
    return request(`/find?name=${encodeURIComponent(name)}&limit=${limit}`, {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
};

export const getAllParents = async (token) => {
    return request("/get-all", {
        method: "GET",
        headers: {
            Authorization: token
        }
    });
};

export const changeBlockStatus = async (parentId, isLocked, token) => {
    return request(`/${parentId}/status?isLocked=${isLocked}`, {
        method: "PATCH",
        headers: {
            Authorization: token
        }
    });
};
