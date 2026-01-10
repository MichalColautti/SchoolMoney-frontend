const REACT_APP_API_BASE_URL = "http://localhost:4000"

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

export const addChild = async (data, token) => {
    try{
        const formData = new FormData();

        const addChildDto = {
            name: data.name,
            surname: data.surname,
            birthday: data.birthday,
        }

        formData.append('childData', new Blob([JSON.stringify(addChildDto)], {
            type: 'application/json'
        }));

        formData.append('token', token);

        formData.append('childPhoto', data.photo);

        return request("/add-children",{
            method: "POST",
            body: formData,
        })
    }
    catch(err){
        console.log("Error during adding child: ", err);
    }
}