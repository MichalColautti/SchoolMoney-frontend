import {request} from "./utils/request";

export async function addClass(data, token) {
    try {
        const formData = new FormData();

        const addClassDto = {
            name: data.name,
            year: data.year,
        }

        formData.append('addClassDto', new Blob([JSON.stringify(addClassDto)], {
            type: 'application/json'
        }));

        formData.append('classPhoto', data.photo);

        return request("/treasurer/add-class", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": token
            }
        })
    } catch (err) {
        throw err;
    }
}

export const deleteChildFromClass = async (classId, childId, token) => {
    const url = `/treasurer/delete-child-from-class/class/${classId}/child/${childId}`;

    return request(url, {
        method: 'POST',
        headers: {
            "Authorization": token
        }
    })
}

export const getAllClasses = async (token) => {
    return request("/treasurer/get-classes", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}

export const getTreasurerFundraisings = async (token) => {
    return request("/treasurer/get-fundraisings", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}

export const returnPayment = async (fundraisingId, childId, token) => {
    return request(`/treasurer/return-payments/${fundraisingId}/${childId}`, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    })
}

export const getTransactions = async (token) => {
    return request("/treasurer/get-transactions", {
        method: "GET",
        headers: {
            "Authorization": token
        }
    })
}
